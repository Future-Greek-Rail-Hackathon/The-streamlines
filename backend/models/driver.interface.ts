import { Package } from "./package.interface";

// Basic Driver attributes
export interface BaseDriver {
    name: string;
    cluster_id:number;
}
// Driver attributes that includes Base Driver's
export interface Driver extends BaseDriver {
    id: number;
}