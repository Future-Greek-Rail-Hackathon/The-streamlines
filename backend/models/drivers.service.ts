// Model interfaces

import { BaseDriver, Driver } from "./driver.interface";
import { Drivers } from "./drivers.interface";
import { Package } from "./package.interface";
import { Packages } from "./packages.interface";
import * as PackageServises from "./packages.service";


// Memory list
let drivers: Drivers = {
    1: {
        id: 1,
        name: "Moe",
        cluster_id: 0,
    },
    2: {
        id: 2,
        name: "Larry",
        cluster_id: 1,

    },
    3: {
        id: 3,
        name: "Curly",
        cluster_id: 2,
    },
}


// Methods

// Return all drivers
export const findAll = async (): Promise<Driver[]> => Object.values(drivers);

// Return driver by id
export const find = async (id: number): Promise<Driver> => drivers[id];

// Create new driver

export const create = async (newDriver: BaseDriver): Promise<Driver> => {
    const id = drivers[Object.values(drivers).length].id + 1;

    drivers[id] = {
        id,
        ...newDriver,
    }

    return drivers[id];
}

// Return items of driver id

export const driverPackages = async (
    id: number
): Promise<Package[] | null> => {
    const driver = await find(id)
    if (!driver) {
        return null;
    }
    let pckgs = PackageServises.driver_package(driver)
    return pckgs;
}


export const driverRemainingPackages = async (
    id: number
): Promise<Package[] | null> => {
    const driver = await find(id)
    if (!driver) {
        return null;
    }
    let pckgs = PackageServises.driver_remaining_package(driver)
    return pckgs;
}