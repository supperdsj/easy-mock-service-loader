import {Component} from '@angular/core';
import {RequestsDataService} from '../entityService/services/requests-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = {};

  constructor(public requestDataService: RequestsDataService) {

  }

  sendRequest(serviceName: string) {
    this.requestDataService.getServiceByName(serviceName).getData(this, {id: 1}, () => {
      console.log('request success');
    });
  }
}
