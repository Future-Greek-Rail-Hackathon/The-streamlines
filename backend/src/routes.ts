import { Router } from 'express';
import userHandler from './controller/userHandler';
const router: Router = Router();

router.use('/users', userHandler);

export default router;
