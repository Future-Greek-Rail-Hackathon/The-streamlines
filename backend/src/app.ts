import _ from './lib/_dotenv';
console.log(_);
import express from 'express';
import cors from 'cors';
// import { packageRouter, clusterRouter } from "./models/packages.routers";
// import { driverRouter } from "./models/driver.routers";
import cookieParser from 'cookie-parser';
import router from './routes';

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Set router base paths
app.use('/api/', router);

export default app;
