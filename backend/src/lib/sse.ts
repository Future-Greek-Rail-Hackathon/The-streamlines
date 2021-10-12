import { clients, SSEClient, SSE, EventType } from '../controller/sseController';

export function sendEventsToAll(event: SSE) {
  clients.forEach((c: SSEClient) => c.response.write(`${JSON.stringify(event)}\n\n`));
}

export function sendEventToUser(event: SSE) {
  switch (event.eventType) {
    case EventType.TRAIN_IS_FULL:
      event.message = `Train for route ${event.routeId} is full!`;
      break;
    case EventType.ORDER_CANCELLED:
      event.message = `Order ${event.orderId} has been cancelled!`;
      break;
    case EventType.ORDER_CREATED:
      event.message = `Order ${event.orderId} has been created!`;
      break;
    case EventType.ORDER_DELAYED:
      event.message = `Order ${event.orderId} has been delayed!`;
      break;
    case EventType.ORDER_SCANNED_AT_END:
      event.message = `Order ${event.orderId} has been scanned at its ending location!`;
      break;
    case EventType.ORDER_SCANNED_AT_START:
      event.message = `Order ${event.orderId} has been scanned at its starting location!`;
      break;
  }
  clients.forEach((c: SSEClient) =>
    c.id === event.userId ? c.response.write(`${JSON.stringify(event)}\n\n`) : null,
  );
}
