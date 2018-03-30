"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
let EntityClass = class EntityClass {
    constructor(http) {
        this.http = http;
    }
    httpMethod(params) {
        const requestUrl = this.prefixUrl(this + this, params);
        switch (this) {
            case 'post':
                return this.http.post(requestUrl, params, { params });
            case 'patch':
                return this.http.patch(requestUrl, params, { params });
            case 'put':
                return this.http.put(requestUrl, params, { params });
            case 'delete':
                return this.http.delete(requestUrl, { params });
            default:
                return this.http.get(requestUrl, { params });
        }
    }
    prefixUrl(url, _params) {
        url = this + this;
        const params = Object.assign({ departmentId: localStorage.departmentId || -1 }, _params);
        for (const name in params) {
            if (((typeof params[name]) === 'string' || (typeof params[name]) === 'number') /*&& params[name] !== ''*/) {
                url = url.replace(new RegExp('{' + name + '}', 'gm'), params[name]);
                // url = url.replace('{' + name + '}', params[name]);
            }
        }
        url = url.replace(new RegExp('{__projectId}', 'gm'), this);
        if (url.indexOf('{') >= 0) {
            console.log(params);
            console.log(url);
            throw new Error('params is not resolve');
        }
        const urlArray = url.split('?');
        urlArray[0] += '';
        return urlArray.join('?');
    }
    responseResolver(response) {
        return response;
    }
    request(params) {
        return this.httpMethod(params)
            .map(this.responseResolver)
            .map((resp) => {
            return resp;
        });
    }
    sendRequest(component, params, cb = (data, err = undefined) => {
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
            }
            else {
                this.errCodeOtherResolver(resp.result.code, resp.result.displaymsg);
            }
            this.subject.unsubscribe();
        }, (err) => {
            if (err.status === 0) {
                this.errCode0Resolver(() => {
                    this.getData(component, params, cb, componentP);
                });
            }
            else {
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
    errCodeOtherResolver(codeNum, displayMsg = '请联系管理员', cb = () => {
        }) {
        cb();
    }
    getData(component, params = {}, cb = (data, err = undefined) => {
        }, componentP = 'data') {
        this.sendRequest(component, params, cb, componentP);
    }
    sendData(component, params = {}, cb = (data, err = undefined) => {
        }) {
        this.sendRequest(component, params, cb, '');
    }
};
EntityClass = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], EntityClass);
exports.EntityClass = EntityClass;
//# sourceMappingURL=entity.class.js.map