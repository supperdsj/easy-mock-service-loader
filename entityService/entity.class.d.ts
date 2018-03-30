import { Component } from '@angular/core';
import { Entity } from './entity.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
export declare class EntityClass implements Entity {
    http: HttpClient;
    subject: any;
    private httpMethod(params);
    constructor(http: HttpClient);
    private prefixUrl(url, _params);
    private responseResolver(response);
    request(params: any): Observable<any>;
    sendRequest(component: any, params: any, cb?: (data: any, err?: Error) => void, componentP?: string): void;
    errCode401Resolver(): void;
    errCode0Resolver(cb?: () => void): void;
    errCodeOtherResolver(codeNum: any, displayMsg?: string, cb?: () => void): void;
    getData(component: Component, params?: Object, cb?: (data: Object, err?: Error) => void, componentP?: string): void;
    sendData(component: Component, params?: Object, cb?: (data: Object, err?: Error) => void): void;
}
