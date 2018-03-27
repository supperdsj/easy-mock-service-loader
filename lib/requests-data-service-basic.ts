import {Entity} from './entity.interface';

export class RequestsDataServiceBasic {
  requestsServiceArray: Array<{ serviceName: string, service: Entity }> = [];

  getServiceByName(serviceName) {
    const service = this.requestsServiceArray.find(s => s.serviceName.toLocaleLowerCase() === serviceName.toLowerCase());
    console.log(service);
    if (!service) {
      throw new Error('Request service name not found');
    } else {
      return service.service;
    }
  }
}
