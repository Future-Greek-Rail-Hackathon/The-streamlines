import { Cluster, Package } from "./package.interface";

export interface Packages {
    [key: number]: Package;
}

export interface Clusters {
    [key: number]: Cluster;
}

