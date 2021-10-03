import { Router } from 'express';
import trainHandler from './controller/trainHandler';
import trainStopHandler from './controller/trainStopHandler';
import userHandler from './controller/userHandler';
const router: Router = Router();

router.use('/users', userHandler);
router.use('/trains', trainHandler);
router.use('/train_stops', trainStopHandler);

export default router;
