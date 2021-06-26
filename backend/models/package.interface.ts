export interface BasePackage {
    voucher: string;
    postcode: number;
    scanned: boolean;
    delivered: boolean
}
export interface Package extends BasePackage {
    id: number;
}

export interface BaseCluster {
    name: string;
    package_ids: number[];
    starting: string;
}
export interface Cluster extends BaseCluster {
    id: number;
}
