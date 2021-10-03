import { NextFunction, Request, Response, Router } from 'express';
import moment from 'moment';
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

export default routeHandler;
