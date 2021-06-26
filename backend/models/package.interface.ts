// Base Package attributes
export interface BasePackage {
    voucher: string;
    postcode: number;
    scanned: boolean;
    delivered: boolean
}

//  Package attributes that includes Base Package's also
export interface Package extends BasePackage {
    id: number;
}

// Base Cluster attributes
export interface BaseCluster {
    name: string;
    package_ids: number[];
    starting: string;
}

// Cluster attributes that includes Base Cluster's also
export interface Cluster extends BaseCluster {
    id: number;
}
