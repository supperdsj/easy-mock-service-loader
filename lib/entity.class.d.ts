import {Observable} from "rxjs/Observable";

export declare class EntityClass {
    request(params: any): Observable<any>;

    getData(component, params = {}, cb = (data: any, err: Error = undefined) => {
    });

    sendData(component, params = {}, cb = (data: any, err: Error = undefined) => {
    });
}
