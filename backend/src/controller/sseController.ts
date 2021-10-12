import { NextFunction, Request, response, Response, Router } from 'express';
import moment from 'moment';
import catchErrors from '../lib/catchErrors';
import { sendEventsToAll, sendEventToUser } from '../lib/sse';
moment.tz.setDefault('Europe/Athens');

const sseHandler: Router = Router();

export type SSEClient = {
  id: number;
  response: Response;
};

export enum EventType {
  ORDER_SCANNED_AT_START = 'order_scanned_at_start',
  ORDER_SCANNED_AT_END = 'order_scanned_at_end',
  ORDER_DELAYED = 'order_delayed',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_CREATED = 'order_created',
  TRAIN_IS_FULL = 'train_is_full',
}

export type SSE = {
  eventType: EventType;
  orderId?: number;
  userId?: number;
  routeId?: number;
  message?: string;
};

export let clients: SSEClient[] = [];
export let events: SSE[] = [];

sseHandler
  .route('/events') // get /api/sse/events
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const headers = {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      };
      res.writeHead(200, headers);

      const data = `data:${JSON.stringify(events)}\n\n`;
      res.write(data);

      const clientId = moment().toDate().getDay();
      const newClient: SSEClient = {
        id: clientId,
        response: res,
      };
      clients.push(newClient);

      req.on('close', () => {
        console.log(`${clientId} Connection closed!`);
        clients = clients.filter((c: any) => c.id !== clientId);
      });
    }),
  );

sseHandler
  .route('/fact') // post /api/sse/fact
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const newEvent = req.body;
      events.push(newEvent);
      res.json(newEvent);
      return sendEventToUser(newEvent);
    }),
  );
export default sseHandler;
