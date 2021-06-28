// Required modules and interfaces

import express, { Request, Response } from "express";
import * as PackageService from "./packages.service";
import { BasePackage, Package, BaseCluster, Cluster } from "./package.interface";
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

// Routers

export const packageRouter = express.Router();
export const clusterRouter = express.Router();


// Controller 


// Get all packages
packageRouter.get("/", async (req: Request, res: Response) => {
    try {
        const packages: Package[] = await PackageService.findAllPackage();

        res.status(200).send(packages);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Get all cluster
clusterRouter.get("/", async (req: Request, res: Response) => {
    try {
        const clusters: Cluster[] = await PackageService.findAllClusters();

        res.status(200).send(clusters);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// Get package by id
packageRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const pacakge: Package = await PackageService.findPackage(id);

        if (pacakge) {
            return res.status(200).send(pacakge);
        }

        res.status(404).send("pacakge not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Get cluster by id
clusterRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const cluster: Cluster = await PackageService.findCluster(id);

        if (cluster) {
            return res.status(200).send(cluster);
        }

        res.status(404).send("cluster not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// post package
packageRouter.post("/", async (req: Request, res: Response) => {
    try {
        const pckage: BasePackage = req.body;

        const newPackage = await PackageService.createPackage(pckage);

        res.status(201).json(newPackage);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message);
    }
});

// post cluster
clusterRouter.post("/", async (req: Request, res: Response) => {
    try {
        const cluster: BaseCluster = req.body;

        const newCluser = await PackageService.createCluster(cluster);

        res.status(201).json(cluster);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Scan item
packageRouter.put("/scan/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {

        const pckage: Package = await PackageService.findPackage(id);

        if (pckage) {
            const updatedItem = await PackageService.scan(id);
            return res.status(200).json(updatedItem);
        }

        res.status(201).json(pckage);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Deliver item
packageRouter.put("/deliver/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {

        const pckage: Package = await PackageService.findPackage(id);

        if (pckage) {
            const updatedItem = await PackageService.deliver(id);
            return res.status(200).json(updatedItem);
        }


        res.status(201).json(pckage);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Delete item
packageRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await PackageService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Get remaining packages
packageRouter.get("/remaining/all", async (req: Request, res: Response) => {
    console.log("here")
    try {
        const packages: Package[] = await PackageService.total_remain_package();

        res.status(200).send(packages);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message);
    }
})

// Reset all items
packageRouter.post("/reset", async (req: Request, res: Response) => {
    try {
        await PackageService.resetAll();

        res.status(200);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message);
    }
})