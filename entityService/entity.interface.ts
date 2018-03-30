import {Component} from "@angular/core";

export interface EntityInterface {
    request(params: Object): any;

    getData(component: Component, params?: Object, cb?: (data: Object, err: Error) => {}, componentP?: string): any;

    sendData(component: Component, params?: Object, cb?: (data: Object, err: Error) => {}): any;

}

export interface EntityDecoratorOptions {
    url: string,
    method: string,
    serviceName: string,
    preUrl: string,
    __projectId: string
}

