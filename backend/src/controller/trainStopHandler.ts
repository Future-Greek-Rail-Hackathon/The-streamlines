import { NextFunction, Request, Response, Router } from 'express';
import { TrainStopType } from '../entity/TrainStop';
import catchErrors from '../lib/catchErrors';
import { TrainStopService } from '../services/trainStop';

const trainStopHandler: Router = Router();

trainStopHandler
  .route('/') // post /api/train_stops/
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const type = req.body['type'];
      const latitude = req.body['latitude'];
      const longitude = req.body['logitude'];

      let newType = type === 'terminal' ? TrainStopType.TERMINAL : TrainStopType.TRANSIT;

      const trainStopModel = new TrainStopService();
      const newTrainStop = await trainStopModel.createTrainStop(newType, latitude, longitude);
      res.json(newTrainStop);
    }),
  );

export default trainStopHandler;
