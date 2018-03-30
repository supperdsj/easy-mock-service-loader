"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestsDataServiceBasic {
    constructor() {
        this.requestsServiceArray = [];
    }
    getServiceByName(serviceName) {
        const service = this.requestsServiceArray.find(s => s.serviceName.toLocaleLowerCase() === serviceName.toLowerCase());
        console.log(service);
        if (!service) {
            throw new Error('Request service name not found');
        }
        else {
            return service.service;
        }
    }
}
exports.RequestsDataServiceBasic = RequestsDataServiceBasic;
//# sourceMappingURL=requests-data-service-basic.js.map