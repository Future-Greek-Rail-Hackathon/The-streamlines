// Model interfaces
import { Driver } from "./driver.interface";
import * as driverServices from "./drivers.service";
import { BasePackage, Package, Cluster, BaseCluster } from "./package.interface";
import { Clusters, Packages } from "./packages.interface";

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

// Memory List of clusters
let clusters: Clusters = {
    1: {
        id: 1,
        name: "A",
        starting: "10",
        package_ids: [0, 2, 7],
    },
    2: {
        id: 2,
        name: "B",
        starting: "11",
        package_ids: [1,3,4],
    },
    3: {
        id: 3,
        name: "C",
        starting: "16",
        package_ids: [5,6,8,9]
    }

}

// Methods

// Return all packages
export const findAllPackage = async (): Promise<Package[]> => Object.values(packages);

// Return all cluster
export const findAllClusters = async (): Promise<Cluster[]> => Object.values(clusters);

// Return package by id
export const findPackage = async (id: number): Promise<Package> => packages[id];

// Return package by id
export const findCluster = async (id: number): Promise<Cluster> => clusters[id];

// Create new package 
export const createPackage = async (newPackage: BasePackage): Promise<Package> => {
    // Get last id from in-memory package list
    const id = packages[Object.values(packages).length].id + 1;

    // Create package
    packages[id] = {
        id,
        ...newPackage,
    }
    // Append to responsible cluster by looking at the first 2 digits of postcode
    if (newPackage.postcode.toString().substr(0, 2) === "10") {
       Object.values(clusters)[1].package_ids.push(id);
    } else if (newPackage.postcode.toString().substr(0, 2) === "11") {
         Object.values(clusters)[2].package_ids.push(id);
    } else if (newPackage.postcode.toString().substr(0, 2) === "16") {
         Object.values(clusters)[3].package_ids.push(id);
    }

    return packages[id];
}

// Create new cluster
export const createCluster = async (newCluster: BaseCluster): Promise<Package> => {
    const id = packages[Object.values(clusters).length].id + 1;

    clusters[id] = {
        id,
        ...newCluster,
    }

    return packages[id];
}


// Get packages based on driver cluster
export const driver_package = async (driver: Driver): Promise<Package[]> => {
    let pckgs: Package[] = [];
    // Get packages from the driver's cluster and append them to a list of type Package
    for (let index = 0; index < Object.values(clusters)[driver.cluster_id].package_ids.length; index++) {
        pckgs.push(Object.values(packages)[Object.values(clusters)[driver.cluster_id].package_ids[index]])
        
    }
    return pckgs;
}

// Get remaining packages based on driver cluster
export const driver_remaining_package = async (driver: Driver): Promise<Package[]> => {
    let pckgs: Package[] = [];
    // Check if the packages of the drive;s class are unscanned and append them to the empty list
    for (let index = 0; index < Object.values(clusters)[driver.cluster_id].package_ids.length; index++) {
        let pckg = Object.values(packages)[Object.values(clusters)[driver.cluster_id].package_ids[index]]
        if (pckg.scanned === false)
        {
            pckgs.push(pckg)
        }
        
    }
    return pckgs;
}

// Get remaining items
export const total_remain_package = async (): Promise<Package[]> => {
    // Get all the unscanned packages
    let pckgs = Object.values(packages).filter(pckg => pckg.scanned === false)
    return pckgs
}

// Scan  item
export const scan = async (
    id: number
): Promise<Package | null> => {
    const packagee = await findPackage(id)
    // Check if package exists
    if (!packagee) {
        return null;
    }

    packagee.scanned = true;
    // Update the packages in-memory list
    packages[id] = packagee;

    return packages[id];
    return null;
}


// Deliver  item
export const deliver = async (
    id: number
): Promise<Package | null> => {
    const packagee = await findPackage(id)

    // Check if package exists
    if (!packagee || packagee.scanned === false) {
        return null;
    }

    packagee.delivered = true;

    // Update the packages in-memory list
    packages[id] = packagee;

    return packages[id];
}

// Delete pacakge
export const remove = async (id: number): Promise<null | void> => {
    const packagee = await findPackage(id);

    // Check if package exists
    if (!packagee) {
        return null;
    }
    // Update the packages in-memory list
    delete packages[id];
}

// Reset packages
export const resetAll = async (): Promise<Package[]> => {
    // Reset the state of the in-memory package list
    for (let index = 0; index < Object.values(packages).length; index++) {
        Object.values(packages)[index].scanned = false;
    }
    return Object.values(packages);
}