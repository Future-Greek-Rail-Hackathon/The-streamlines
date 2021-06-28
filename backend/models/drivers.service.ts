// Model interfaces

import { BaseDriver, Driver } from "./driver.interface";
import { Drivers } from "./drivers.interface";
import { Package } from "./package.interface";
import { Packages } from "./packages.interface";
import * as PackageServises from "./packages.service";
import pool from './dbconfig'



// Methods

// Return all drivers
export const findAll = async (): Promise<Driver[]> => {
    // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = "select * from drivers;"
    // Execute query
    const { rows } = await client.query(sql);
    const drivers = rows;

    return drivers;
};

// Return driver by id
export const find = async (id: number): Promise<Driver> => {
    // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = `select * from drivers where ID = ${id};`
    // Execute query
    const { rows } = await client.query(sql);
    const driver = rows[0];
    client.release();

    return driver;
};

// Create new driver
export const create = async (newDriver: BaseDriver): Promise<null> => {
    // Connect to db
    const client = await pool.connect();

    // Insert to packages table
    const sql = `insert into drivers(name,cluster_name) values ('${newDriver.name}',${newDriver.cluster_name});`
    let ans = await client.query(sql)
    client.release();

    return null;
}

// Return packages of driver based on the id
export const driverPackages = async (
    id: number
): Promise<Package[] | null> => {
    // Connect to db
    const client = await pool.connect();
    // Set query
    const sql = `select p.* from public.drivers d
                left join public.clusters c on c."Name" = "Cluster_name"
                left join public.packages p on p."id" = ANY(c."Package_ids")
                where d."ID" =${id};`
    // Execute query
    const { rows } = await client.query(sql);
    const driver = rows;
    client.release();

    return driver;
}

// Return remaining(unscanned) packages of driver based on the id
export const driverRemainingPackages = async (
    id: number
): Promise<Package[] | null> => {
    // Connect to db
    const client = await pool.connect();
    // Set query
    const sql = `select p.* from public.drivers d
                left join public.clusters c on c."Name" = "Cluster_name"
                left join public.packages p on p."id" = ANY(c."Package_ids")
                where d."ID" =${id} and scanned = false;`
    // Execute query
    const { rows } = await client.query(sql);
    const driver = rows;

    client.release();
    return driver;
}