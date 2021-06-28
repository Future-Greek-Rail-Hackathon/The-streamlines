import { Package } from "./package.interface";

// Basic Driver attributes
export interface BaseDriver {
    name: string;
    cluster_name:string;
}
// Driver attributes that includes Base Driver's
export interface Driver extends BaseDriver {
    id: number;
}