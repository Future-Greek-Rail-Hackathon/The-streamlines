import _ from './lib/_dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
// import { packageRouter, clusterRouter } from "./models/packages.routers";
// import { driverRouter } from "./models/driver.routers";
import cookieParser from 'cookie-parser';
import router from './routes';
import cronHandler from './controller/cron';
import sseHandler, { clients } from './controller/sseController';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/status', (req: Request, resp: Response) => resp.json({ clients: clients.length }));
app.use('/sse', sseHandler);
// Set router base paths
app.use('/api/', router);
app.use('/cron/', cronHandler);

export default app;
