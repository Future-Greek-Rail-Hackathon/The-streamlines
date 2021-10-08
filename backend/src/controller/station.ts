import { NextFunction, Request, Response, Router } from 'express';
import moment from 'moment';
import catchErrors from '../lib/catchErrors';
import { OrderService } from '../services/order';
import { TrainStopService } from '../services/trainStop';
moment.tz.setDefault('Europe/Athens');

const stationRouter: Router = Router();

stationRouter
  .route('/scan/:id') // post /api/station/:id
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const orderId = req.body['id'];
      const stationId = req.body['stationId'];

      const orderModel = new OrderService();
      let order = await orderModel.findById(orderId);

      const stationModel = new TrainStopService();
      let station = await stationModel.findById(stationId);

      const response = await orderModel.scanOrder(order, station);

      res.send(response);
    }),
  );

export default stationRouter;
