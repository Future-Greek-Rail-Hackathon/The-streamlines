import express from 'express';
import cors from "cors";
import { packageRouter,clusterRouter } from "./models/packages.routers"
import { driverRouter } from './models/driver.routers';
import pool from './models/dbconfig'

const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;


// parse application/json
app.use(bodyParser.json())
app.use(cors());
// Set headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

// Connect to database
pool.connect(function (err, client, done) {
  if (err) throw new Error(err.message);
  console.log('Connected');
});


// Set router base paths
app.use("/api/packages", packageRouter)
app.use("/api/drivers", driverRouter)
app.use("/api/clusters", clusterRouter)

// Init server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

export default app;