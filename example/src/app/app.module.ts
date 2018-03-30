import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RequestsDataServicesDepends} from '../entityService/services/requests-data-service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [...RequestsDataServicesDepends],
  bootstrap: [AppComponent]
})
export class AppModule {
}
