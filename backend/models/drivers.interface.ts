import { Driver } from "./driver.interface";

// Class Drivers includes an array of Objects of type Driver
export interface Drivers {
    [key: number]: Driver;
}