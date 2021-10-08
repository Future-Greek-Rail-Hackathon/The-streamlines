import { NextFunction, Request, Response, Router } from 'express';
import moment from 'moment';
import catchErrors from '../lib/catchErrors';
import { RouteService } from '../services/route';
moment.tz.setDefault('Europe/Athens');

const cronHandler: Router = Router();

cronHandler
  .route('/recurring') // post /api/cron/recurring
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      // Get Recurring Routes
      const routeModel = new RouteService();
      let routes = await routeModel.getRecurring();
      await routeModel.recurRoutes(routes);

      res.json('ok');
    }),
  );

export default cronHandler;
