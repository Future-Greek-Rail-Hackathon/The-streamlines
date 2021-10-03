import { Router } from 'express';
import trainHandler from './controller/trainHandler';
import userHandler from './controller/userHandler';
const router: Router = Router();

router.use('/users', userHandler);
router.use('/trains', trainHandler);

export default router;
