import {Component} from "@angular/core";

export interface EntityInterface {

    getData(component: Component, params?: Object, cb?: (data: Object, err: Error) => {}, componentP?: string): any;

    sendData(component: Component, params?: Object, cb?: (data: Object, err: Error) => {}): any;
}

export interface EntityDecoratorOptions {
    url: string,
    method: string,
    serviceName: string,
    __projectId: string
}

