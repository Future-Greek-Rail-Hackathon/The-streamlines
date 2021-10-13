import { NextFunction, Request, Response, Router } from 'express';
import moment from 'moment';
import { TrainType } from '../entity/Trains';
import catchErrors from '../lib/catchErrors';
import { RouteService } from '../services/route';
moment.tz.setDefault('Europe/Athens');

const routeHandler: Router = Router();

routeHandler
  .route('/') // post /api/routes/
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const startLocationId = req.body['startLocationId'];
      const endLocationId = req.body['endLocationId'];
      const estimatedTime = req.body['estimatedTime'];
      const startTime = req.body['startTime'];

      console.log(estimatedTime);
      const routeModel = new RouteService();
      let et = moment(estimatedTime).toDate();
      let start = moment(startTime).toDate();
      const newRoute = await routeModel.createRoute(startLocationId, endLocationId, et, start);

      res.json(newRoute);
    }),
  );

routeHandler
  .route('/') // get /api/routes/
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      // Body params
      const routeModel = new RouteService();
      const routes = await routeModel.findAll();

      res.json(routes);
    }),
  );

routeHandler
  .route('/assign_train') // get /api/routes/assign_train
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      // Body params
      const routeId = req.body['routeId'];
      const trainId = req.body['trainId'];

      const routeModel = new RouteService();
      const route = await routeModel.findById(routeId);

      let newRoute = await routeModel.assignTrain(route, trainId);

      res.json(newRoute);
    }),
  );

routeHandler
  .route('/available') // get /api/routes/available
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      // Body params
      const totalWeight = req.body['totalWeight'];
      const trainType =
        req.body['trainType'] === 'full_train' ? TrainType.FULL_TRAIN : TrainType.NON_FULL_TRAIN;

      const routeModel = new RouteService();
      const routes = await routeModel.findAvailable(parseInt(totalWeight), trainType);

      res.json(routes);
    }),
  );

export default routeHandler;
