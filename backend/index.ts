import express from 'express';
import cors from "cors";
import { packageRouter,clusterRouter } from "./models/packages.routers"
import { driverRouter } from './models/driver.routers';

const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;


// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/packages", packageRouter)
app.use("/api/drivers", driverRouter)
app.use("/api/clusters", clusterRouter)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

export default app;