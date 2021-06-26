// Required modules and interfaces

import express, { Request, Response } from "express";
import * as DriverServices from "./drivers.service";
import { BaseDriver, Driver } from "./driver.interface";
import { Package } from "./package.interface";
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

// Router 

export const driverRouter = express.Router();

// Controller 


// Get all drivers
driverRouter.get("/", async (req: Request, res: Response) => {
    try {
        const drivers: Driver[] = await DriverServices.findAll();

        res.status(200).send(drivers);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Get driver by id
driverRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const driver: Driver = await DriverServices.find(id)

        res.status(200).send(driver);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Get packages by driver id
driverRouter.get("/driver_packages/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const pckgs = await DriverServices.driverPackages(id)

        res.status(200).send(pckgs);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Get remaining packages by driver id
driverRouter.get("/driver_reamaining_packages/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const pckgs = await DriverServices.driverRemainingPackages(id)

        res.status(200).send(pckgs);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message);
    }
})