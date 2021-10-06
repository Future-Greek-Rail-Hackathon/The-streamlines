import { NextFunction, Request, Response, Router } from 'express';
import { WagonType } from '../entity/Wagon';
import catchErrors from '../lib/catchErrors';
import { TrainService } from '../services/train';
import { WagonService } from '../services/wagons';

const wagonHandler: Router = Router();

wagonHandler
  .route('/') // post /api/wagons/
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const type = req.body['type'];
      const maxWeight = req.body['maxWeight'];
      const maxVolume = req.body['maxVolume'];
      const minWeightPerPackage = req.body['minWeightPerPackage'];

      let newType = type === 'single_wagon' ? WagonType.SINGLE_WAGON : WagonType.CONTAINER;

      const wagonModel = new WagonService();
      const newWagon = await wagonModel.wagonRepository.create();
      newWagon.currentVolume = 0.0;
      newWagon.currentWeight = 0.0;

      newWagon.maxVolume = parseInt(maxVolume);
      newWagon.maxWeight = parseInt(maxWeight);
      newWagon.type = newType;
      newWagon.minWeightPerPackage = parseFloat(minWeightPerPackage);
      await wagonModel.createWagon(newWagon);
      res.json(newWagon);
    }),
  );
wagonHandler
  .route('/') // get /api/wagons/
  .get(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const wagonModel = new WagonService();
      const wagons = await wagonModel.findAll();

      res.json(wagons);
    }),
  );

export default wagonHandler;
