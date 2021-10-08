import _ from './lib/_dotenv';
import express from 'express';
import cors from 'cors';
// import { packageRouter, clusterRouter } from "./models/packages.routers";
// import { driverRouter } from "./models/driver.routers";
import cookieParser from 'cookie-parser';
import router from './routes';
import cronHandler from './controller/cron';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Set router base paths
app.use('/api/', router);
app.use('/cron/', cronHandler);

export default app;
