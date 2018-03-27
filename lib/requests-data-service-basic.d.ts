import {Entity} from "./entity.interface";

export declare class RequestsDataServiceBasic {
    requestsServiceArray: Array<{ serviceName: string, service: Entity }>;
    getServiceByName(serviceName);
}
