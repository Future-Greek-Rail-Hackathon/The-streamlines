import { NextFunction, Request, Response, Router } from 'express';
import moment from 'moment';
import { OrderState } from '../entity/Order';
import { Package } from '../entity/Package';
import { TrackRecordType } from '../entity/TrackRecord';
import catchErrors from '../lib/catchErrors';
import { OrderService } from '../services/order';
import { PackageService } from '../services/package';
import { TrackRecordService } from '../services/trackRecord';
moment.tz.setDefault('Europe/Athens');

const orderHandler: Router = Router();

orderHandler
  .route('/') // post /api/orders
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.body['userId'];
      const packages = req.body['packages'];
      const routeId = req.body['routeId'];
      const pickupDate = moment(req.body['requestedPickupDate']).toDate();

      const packageModel = new PackageService();
      let pckgs: Package[] = [];
      // Create Order
      const orderModel = new OrderService();
      let newOrder = orderModel.orderRepository.create();

      // Create packages
      for (let index = 0; index < packages.length; index++) {
        const pckg = packages[index];
        let newPckg = new Package();
        newPckg.type = null;
        newPckg.volume = parseFloat(pckg.volume);
        newPckg.price = parseFloat(pckg.price);
        newPckg.weight = parseFloat(pckg.weight);
        newPckg.order = newOrder;
        newPckg = await packageModel.packageRepository.create(newPckg);
        pckgs.push(newPckg);
      }

      newOrder = await orderModel.createOrder(userId, packages, routeId, pickupDate);

      res.json(newOrder);
    }),
  );

orderHandler
  .route('/cancel') // post /api/orders/canel
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const orderId = req.body['orderId'];

      // Cancel Order
      const orderModel = new OrderService();
      await orderModel.cancelOrder(orderId);
      res.json('ok');
    }),
  );

orderHandler
  .route('/complete') // post /api/orders/complete
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const orderId = req.body['orderId'];

      // Create Order
      const orderModel = new OrderService();
      let order = await orderModel.findById(orderId);

      order = await orderModel.updateOrderStatus(order, OrderState.FINISHED);

      //Create track
      const trackRecordModel = new TrackRecordService();
      await trackRecordModel.createTrackRecord(TrackRecordType.DELIVERED, order);

      res.json(order);
    }),
  );

export default orderHandler;
