import {Component, Injectable} from '@angular/core';
import {Entity} from './entity.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EntityClass implements Entity {
    subject: any;

    private httpMethod(params: { [param: string]: string | string[]; }): Observable<any> {
        const requestUrl = this.prefixUrl(this as any['preUrl'] + this as any['url'], params);
        switch (this as any['method']) {
            case 'post':
                return this.http.post(requestUrl, params, {params});
            case 'patch':
                return this.http.patch(requestUrl, params, {params});
            case 'put':
                return this.http.put(requestUrl, params, {params});
            case 'delete':
                return this.http.delete(requestUrl, {params});
            default:
                return this.http.get(requestUrl, {params});
        }
    }

    constructor(public http: HttpClient) {
    }

    private prefixUrl(url: any, _params: Object): string {
        url = this as any['preUrl'] + this as any['url'];
        const params: any = Object.assign({departmentId: localStorage.departmentId || -1}, _params);
        for (const name in params) {
            if (((typeof params[name]) === 'string' || (typeof params[name]) === 'number') /*&& params[name] !== ''*/) {
                url = url.replace(new RegExp('{' + name + '}', 'gm'), params[name]);
                // url = url.replace('{' + name + '}', params[name]);
            }
        }
        url = url.replace(new RegExp('{__projectId}', 'gm'), this as any['__projectId']);
        if (url.indexOf('{') >= 0) {
            console.log(params);
            console.log(url);
            throw new Error('params is not resolve');
        }
        const urlArray = url.split('?');
        urlArray[0] += '';
        return urlArray.join('?');
    }

    private responseResolver(response: any): any {
        return response;
    }

    request(params: any): Observable<any> {
        return this.httpMethod(params)
            .map(this.responseResolver)
            .map((resp) => {
                return resp;
            });
    }

    sendRequest(component: any, params: any, cb = (data: any, err: Error = undefined) => {
    }, componentP = '') {
        this.subject = this.request(params).subscribe((resp) => {
            if (resp.result.success) {
                if (componentP) {
                    component[componentP] = resp.data;
                }
                cb(resp.data);
                return;
            }
            if (resp.result.code === 401) {
                this.errCode401Resolver();
            } else {
                this.errCodeOtherResolver(resp.result.code, resp.result.displaymsg);
            }
            this.subject.unsubscribe();
        }, (err) => {
            if (err.status === 0) {
                this.errCode0Resolver(() => {
                    this.getData(component, params, cb, componentP);
                });
            } else {
                this.errCodeOtherResolver(err.status);
            }
        }, () => {
        });
    }

    errCode401Resolver() {
    }

    errCode0Resolver(cb = () => {
    }) {
        cb();
    }

    errCodeOtherResolver(codeNum: any, displayMsg = '请联系管理员', cb = () => {
    }) {
        cb();
    }

    getData(component: Component, params:Object = {}, cb = (data: Object, err: Error = undefined) => {
    }, componentP = 'data') {
        this.sendRequest(component, params, cb, componentP);
    }

    sendData(component: Component, params:Object = {}, cb = (data: Object, err: Error = undefined) => {
    }) {
        this.sendRequest(component, params, cb, '');
    }
}
