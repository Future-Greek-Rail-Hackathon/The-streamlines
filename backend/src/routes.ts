import { Router } from 'express';
import routeHandler from './controller/routeHandler';
import trainHandler from './controller/trainHandler';
import trainStopHandler from './controller/trainStopHandler';
import userHandler from './controller/userHandler';
const router: Router = Router();

router.use('/users', userHandler);
router.use('/trains', trainHandler);
router.use('/train_stops', trainStopHandler);
router.use('/routes', routeHandler);

export default router;
