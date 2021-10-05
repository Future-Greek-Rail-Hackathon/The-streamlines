import { NextFunction, Request, Response, Router } from 'express';
import { TrainType } from '../entity/Trains';
import catchErrors from '../lib/catchErrors';
import { TrainService } from '../services/train';
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
  .route('/') // get /api/trains/
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const trainModel = new TrainService();
      const trains = await trainModel.findAll();
      res.json(trains);
    }),
  );

export default trainHandler;
