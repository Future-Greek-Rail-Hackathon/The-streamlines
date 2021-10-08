import { NextFunction, Request, Response, Router } from 'express';
import { OrderState } from '../entity/Order';
import { TrainType } from '../entity/Trains';
import catchErrors from '../lib/catchErrors';
import { OrderService } from '../services/order';
import { RouteService } from '../services/route';
import { TrainService } from '../services/train';
import { WagonService } from '../services/wagons';
const trainHandler: Router = Router();

trainHandler
  .route('/') // post /api/trains/
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const type = req.body['type'];
      let canGoAboard = req.body['canGoAboard'];
      const maxWeight = req.body['maxWeight'];

      let newType = type === 'full_train' ? TrainType.FULL_TRAIN : TrainType.NON_FULL_TRAIN;

      canGoAboard = canGoAboard === '0' ? false : true;
      const trainModel = new TrainService();
      const newTrain = await trainModel.createTrain(newType, canGoAboard, maxWeight);
      res.json(newTrain);
    }),
  );

trainHandler
  .route('/:id') // get /api/trains/:id
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      const trainModel = new TrainService();
      const train = await trainModel.findById(id);
      res.json(train);
    }),
  );

trainHandler
  .route('/') // get /api/trains/available
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const trainModel = new TrainService();
      const trains = await trainModel.findAll();
      res.json(trains);
    }),
  );

trainHandler
  .route('/available') // get /api/trains/available
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const trainModel = new TrainService();
      const trains = await trainModel.findAvailable();
      res.json(trains);
    }),
  );

trainHandler
  .route('/assign_wagon') // post /api/trains/assign_wagon
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const wagonId = req.body['wagonId'];
      const trainId = req.body['trainId'];

      const trainModel = new TrainService();
      const train = await trainModel.findById(trainId);

      const wagonModel = new WagonService();
      const wagon = await wagonModel.findById(wagonId);

      if (train.wagons.includes(wagon)) {
        res.end('already assigned');
      } else if (wagon.currentTrain !== null) {
        res.end('already got train');
      }

      let newTrain = await trainModel.addWagon(train, wagon);
      await trainModel.trainRepository.save(newTrain);
      res.json(newTrain);
    }),
  );

trainHandler
  .route('/arrive') // get /api/trains/arrive
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const trainId = req.body['trainId'];

      const trainModel = new TrainService();
      const train = await trainModel.findById(trainId);

      // Get current route orders
      let orders = await trainModel.getCurrentRoutesOrder(train);
      // Make all order of this route arrived
      const orderModel = new OrderService();
      orders = await orderModel.updateOrdersStatus(orders, OrderState.ARRIVED);

      //Make routes currentid null
      let routeModel = new RouteService();
      const route = await routeModel.findById(trainId);
      await routeModel.clearTrain(route);

      res.json(train);
    }),
  );

trainHandler
  .route('/start') // get /api/trains/start
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const trainId = req.body['trainId'];

      const trainModel = new TrainService();
      const train = await trainModel.findById(trainId);

      // Get current route orders
      let orders = await trainModel.getCurrentRoutesOrder(train);
      // Make all order of this route arrived
      const routeModel = new RouteService();
      const response = await routeModel.startRoute(orders);

      res.json(response);
    }),
  );

export default trainHandler;
