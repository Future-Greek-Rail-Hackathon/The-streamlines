import { Package } from "./package.interface";

export interface BaseDriver {
    name: string;
    cluster_id:number;
}

export interface Driver extends BaseDriver {
    id: number;
}