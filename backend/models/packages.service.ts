// Model interfaces
import { Driver } from "./driver.interface";
import * as driverServices from "./drivers.service";
import { BasePackage, Package, Cluster, BaseCluster } from "./package.interface";
import { Clusters, Packages } from "./packages.interface";
import pool from './dbconfig'

// Memory list for packages
let packages: Packages = {
    1: {
        id: 1,
        scanned: false,
        voucher: "A1A",
        postcode: 10041,
        delivered: false,
    },
    2: {
        id: 2,
        scanned: false,
        voucher: "B2B",
        postcode: 11332,
        delivered: false,
    },
    3: {
        id: 3,
        scanned: false,
        voucher: "C3C",
        postcode: 10042,
        delivered: false,
    },
    4: {
        id: 4,
        scanned: false,
        voucher: "D4D",
        postcode: 11342,
        delivered: false,
    },
    5: {
        id: 5,
        scanned: false,
        voucher: "E5E",
        postcode: 11444,
        delivered: false,
    },
    6: {
        id: 6,
        scanned: false,
        voucher: "F6F",
        postcode: 16788,
        delivered: false,
    },
    7: {
        id: 7,
        scanned: false,
        voucher: "G7G",
        postcode: 16788,
        delivered: false,
    },
    8: {
        id: 8,
        scanned: false,
        voucher: "H8H",
        postcode: 10043,
        delivered: false,
    },
    9: {
        id: 9,
        scanned: false,
        voucher: "I9I",
        postcode: 16800,
        delivered: false,
    },
    10: {
        id: 10,
        scanned: false,
        voucher: "J0J",
        postcode: 16801,
        delivered: false,
    }
}

// Methods

// Return all packages
export const findAllPackage = async (): Promise<Package[]> => {
    // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = "select * from packages;"
    // Execute query
    const { rows } = await client.query(sql);
    const packages = rows;
    client.release();

    return packages;

};

// Return all cluster
export const findAllClusters = async (): Promise<Cluster[]> => {
    // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = "select * from clusters;"
    // Execute query
    const { rows } = await client.query(sql);
    const clusters = rows;
    client.release();

    return clusters;
};

// Return package by id
export const findPackage = async (id: number): Promise<Package> => 
{
    // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = `select * from packages where ID = ${id};`
    // Execute query
    const {rows} = await client.query(sql);
    const pckg = rows[0];
    
    console.log(pckg)
    client.release();
    return pckg;
};

// Return package by id
export const findCluster = async (id: number): Promise<Cluster> => 
{
     // Connec to db
    const client = await pool.connect();
    // Set query
    const sql = `select * from clusters where ID = ${id};`
    // Execute query
    const {rows} = await client.query(sql);
    const cluster = rows[0];
    client.release();

    return cluster;
};

// Create new package 
export const createPackage = async (newPackage: BasePackage): Promise<null> => {

    // Connect to db
    const client = await pool.connect();

    // Insert to packages table
    const sql = `insert into public.packages(voucher,postcode,scanned,delivered) values ('${newPackage.voucher}',${newPackage.postcode},${newPackage.scanned}, ${newPackage.delivered}) returning ID;`
    let ans = await client.query(sql)
    // Get id from last insertion
    const id = ans.rows[0]
    
    // Get first two digits of postcode
    const digits = newPackage.postcode.toString().substr(0, 2)
    // Append to cluster
    const updtSql = `update public.clusters set "Package_ids" = array_append("Package_ids",'${id.id}') where "Starts" LIKE '${digits}%';`
    ans = await client.query(updtSql);
    console.log(ans)
    client.release();

    return null;
}



// Create new cluster
export const createCluster = async (newCluster: BaseCluster): Promise<null> => {
   // Connect to db
    const client = await pool.connect();

    // Insert to packages table
    const sql = `insert into clusters(name,package_ids,starting) values ('${newCluster.name}','{}'.'${newCluster.starting}');`
    let ans = await client.query(sql)
    client.release();

    return null;
}



// Get remaining items
export const total_remain_package = async (): Promise<Package[]> => {
     // Connec to db
    const client = await pool.connect();
    // Set query we need only the unscanned packages
    const sql = "select * from packages where scanned = false;"
    // Execute query
    const { rows } = await client.query(sql);
    const packages = rows;
    client.release();

    return packages;
}

// Scan  item
export const scan = async (
    id: number
): Promise<Package | null> => {
    // Connect to db
    const client = await pool.connect();

    // Update package to scanned
    const updtSql = `update packages set Scanned = 'true'  where id = '${id}';`
    const ans = await client.query(updtSql);
    console.log(ans)
    client.release();

    return null;
}


// Deliver  item
export const deliver = async (
    id: number
): Promise<Package | null> => {
    // Connect to db
    const client = await pool.connect();

    // Update package to scanned
    const updtSql = `update public.packages set delivered = true  where id = '${id}';`
    const ans = await client.query(updtSql);
    console.log(ans)
    client.release();

    return null;
}

// Delete pacakge
export const remove = async (id: number): Promise<null | void> => {
    // Connect to db
    const client = await pool.connect();

    // Update package to scanned
    const delSql = `delete from packages where id = '${id}';`
    const ans = await client.query(delSql);
    console.log(ans)
    client.release();

    return null;
}

// Reset packages
export const resetAll = async (): Promise<null> => {
   // Connect to db
    const client = await pool.connect();

    // Update package to scanned
    const updtSql = `update packages set scanned = false, delivered = false ;`
    const ans = await client.query(updtSql);
    console.log(ans)
    client.release();

    return null;
}