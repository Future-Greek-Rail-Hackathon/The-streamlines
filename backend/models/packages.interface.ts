import { Cluster, Package } from "./package.interface";

// Packages contains an array of Objects of type Package with an id as identifier
export interface Packages {
    [key: number]: Package;
}
// Clusters contains an array of Objects of type Cluster with an id as identifier
export interface Clusters {
    [key: number]: Cluster;
}

