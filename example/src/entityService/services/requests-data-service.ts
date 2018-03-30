import {Injectable} from '@angular/core';
import {DemoProjectGetQueryDataService} from './demoProject/demoProject-GetQuery-data-service';
import {DemoProjectGetRestfulListDataService} from './demoProject/demoProject-GetRestfulList-data-service';
import {DemoProjectGetProxyDataService} from './demoProject/demoProject-GetProxy-data-service';
import {DemoProjectGetMockDataService} from './demoProject/demoProject-GetMock-data-service';
import {DemoProjectGetDataService} from './demoProject/demoProject-Get-data-service';
import {DemoProjectPostUploadDataService} from './demoProject/demoProject-PostUpload-data-service';
@Injectable()
export class RequestsDataService {
  requestsServiceArray = [];
  constructor(private demoProjectGetQueryDataService: DemoProjectGetQueryDataService,
private demoProjectGetRestfulListDataService: DemoProjectGetRestfulListDataService,
private demoProjectGetProxyDataService: DemoProjectGetProxyDataService,
private demoProjectGetMockDataService: DemoProjectGetMockDataService,
private demoProjectGetDataService: DemoProjectGetDataService,
private demoProjectPostUploadDataService: DemoProjectPostUploadDataService) {
    this.requestsServiceArray = [{name: 'demoProjectGetQueryDataService', service: demoProjectGetQueryDataService},
{name: 'demoProjectGetRestfulListDataService', service: demoProjectGetRestfulListDataService},
{name: 'demoProjectGetProxyDataService', service: demoProjectGetProxyDataService},
{name: 'demoProjectGetMockDataService', service: demoProjectGetMockDataService},
{name: 'demoProjectGetDataService', service: demoProjectGetDataService},
{name: 'demoProjectPostUploadDataService', service: demoProjectPostUploadDataService}];
  }
  
  getServiceByName(serviceName: string) {
    const service = this.requestsServiceArray.find(s => s.name.toLocaleLowerCase() === serviceName.toLowerCase());
    console.log(service);
    if (!service) {
      throw new Error('Request service name not found');
    } else {
      return service.service;
    }
  }
}
export let RequestsDataServicesDepends = [DemoProjectGetQueryDataService,
DemoProjectGetRestfulListDataService,
DemoProjectGetProxyDataService,
DemoProjectGetMockDataService,
DemoProjectGetDataService,
DemoProjectPostUploadDataService,
RequestsDataService];
