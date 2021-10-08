import { Router } from 'express';
import orderHandler from './controller/orderHandler';
import routeHandler from './controller/routeHandler';
import stationRouter from './controller/station';
import trainHandler from './controller/trainHandler';
import trainStopHandler from './controller/trainStopHandler';
import userHandler from './controller/userHandler';
import wagonHandler from './controller/wagonHandler';
const router: Router = Router();

router.use('/users', userHandler);
router.use('/trains', trainHandler);
router.use('/train_stops', trainStopHandler);
router.use('/routes', routeHandler);
router.use('/wagons', wagonHandler);
router.use('/orders', orderHandler);
router.use('/station', stationRouter);

export default router;
