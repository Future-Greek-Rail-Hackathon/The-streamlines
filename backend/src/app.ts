import _ from "./lib/_dotenv";
console.log(_);
import express from "express";
import cors from "cors";
// import { packageRouter, clusterRouter } from "./models/packages.routers";
// import { driverRouter } from "./models/driver.routers";
import cookieParser from "cookie-parser";

const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Set router base paths
// app.use("/api/packages", packageRouter);
// app.use("/api/drivers", driverRouter);
// app.use("/api/clusters", clusterRouter);

export default app;
