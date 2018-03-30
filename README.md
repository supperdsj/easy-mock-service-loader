# 从零实现 SPA 框架快速同步配置生成接口(angular2 + Easy-mock) 

## 背景
随着 Angular, Vue, React 等 SPA 框架的普及，前后端分离的开发方式已经成为了主流，而由于前后端的并行开发，接口联调则成为了经常会出现问题的环节。
前后端接口（Interface）的调用本身实际上可看作前后端数据的调用过程，而 Http 只是实现前后端接口调用的手段而已。但前后端的接口联调工作往往会有很大一部分的时间花费在文档同步、URL 修改等繁复的机械性工作中。
本文旨在抛砖引玉，介绍我们团队内 angular 项目正在使用的接口同步思想，使用自动同步接口配置的方法弱化 Http 接口的存在，

## 使用 [Easy-mock](https://github.com/easy-mock/easy-mock/blob/dev/README.zh-CN.md) 书写接口文档
Easy Mock 是一个可视化，并且能快速生成模拟数据的持久化服务，具有以下特性：
* 支持接口代理
* 支持快捷键操作
* 支持协同编辑
* 支持团队项目
* 支持 RESTful
* 支持 Swagger | OpenAPI Specification (1.2 & 2.0 & 3.0)
* 基于 Swagger 快速创建项目
* 支持显示接口入参与返回值
* 支持显示实体类
* 支持灵活性与扩展性更高的响应式数据开发
* 支持自定义响应配置（例：status/headers/cookies）
* 支持 Mock.js 语法
* 支持 restc 方式的接口预览

Easy Mock 可通过 Swagger 同步接口，并可使用 Mock.js 语法生成丰富的接口数据供前端调用，满足了接口文档和 mock 服务器所需的全部功能。

## 使用配置接口的基类 EntityClass
前后端接口（Interface）的调用本身实际上可看作前后端数据的调用过程，而 http 只是实现前后端接口调用的手段而已，所以我们前端团队推广 Easy-mock 后，将 Easy-mock 的一个个接口视为一个个的 Angular Service，实现了名为 EntityClass 的 Service 基类，EntityClass 代码如下：

```TypeScript
    
    /* 
    export const environment = {
    production: false,
    baseUrl: 'https://www.easy-mock.com/mock/{__projectId}'};
    */
import {Component, Injectable} from '@angular/core';
import {EntityInterface} from './entity.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from "../environments/environment";

@Injectable()
export class EntityClass implements EntityInterface {
    subject: any;

    private httpMethod(params: { [param: string]: string | string[]; }): Observable<any> {
        const requestUrl = this.prefixUrl(environment.baseUrl + this['url'], params);
        switch (this['method']) {
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

    private prefixUrl(url: any, params: Object): string {
        // 可附加部分全局参数
        for (const name in params) {
            if (((typeof params[name]) === 'string' || (typeof params[name]) === 'number') /*&& params[name] !== ''*/) {
                url = url.replace(new RegExp('{' + name + '}', 'gm'), params[name]);
                // url = url.replace('{' + name + '}', params[name]);
            }
        }
        url = url.replace(new RegExp('{__projectId}', 'gm'), this['__projectId']);
        console.log(url);
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

    sendRequest(component: any = undefined, params: any, cb = (data: any, err: Error = undefined) => {
    }, componentP = '') {
        this.subject = this.httpMethod(params)
            .map(this.responseResolver)
            .map((resp) => {
                return resp;
            }).subscribe((resp) => {
                if (componentP && component) {
                    component[componentP] = resp.data;
                }
                cb(resp.data);
                this.subject.unsubscribe();
            }, (err) => {
                if (err.status === 0) {
                    this.getData(component, params, cb, componentP);
                } else {
                    cb({}, err);
                }
            }, () => {
            });
    }

    getData(component: Component, params: Object = {}, cb = (data: Object, err: Error = undefined) => {
    }, componentP = 'data') {
        this.sendRequest(component, params, cb, componentP);
    }

    sendData(component: Component, params: Object = {}, cb = (data: Object, err: Error = undefined) => {
    }) {
        this.sendRequest(component, params, cb, '');
    }
}



```

EntityClass 主要有以下几个方法

### prefixUrl(url: any, params: Object): string
负责 URL 内 {param} 格式的字符串被对应的 param 替换 ，如有 URL 为 `http://blog.dongsj.cn/user/{id}` 和 params 为 `{id:1}` ，则会返回值 `http://blog.dongsj.cn/user/1`
###  private responseResolver(response: any): any
负责 response 的处理，可在子类进行重写
### sendRequest(component: any = undefined, params: any, cb = (data: any, err: Error = undefined) => {}, componentP = '') 
负责通用的 request 的发送和 response 的处理，并将 response 的数据自动存储到实际类型为 Component 的 component 的 componentP 字段内
### getData(component: Component, params: Object = {}, cb = (data: Object, err: Error = undefined)
在读数据的场景使用，实质为带了部分参数的 sendRequest 方法，会降 response 赋值 component.data 内，具体使用会在日后其他文章內说明
### sendData(component: Component, params: Object = {}, cb = (data: Object, err: Error = undefined)
在写数据的场景使用，实质为带了部分参数的 sendRequest 方法，具体使用会在日后其他文章內说明

## 使用注解和 EntityClass 生成接口
上文已经实现了 Angular 内的 Service 基类 EntityClass，现只需对 EntityClass 配置 url，preUrl，method 即可生成对应的接口，并在需要时进行接口注入并使用。我们书写了注解 EntityDecorator 对 Service 配置上述属性并继承 EntityClass，即可实现接口 Service 的配置化生成，EntityDecorator 代码如下：

```TypeScript

import {EntityDecoratorOptions} from './entity.interface';

export interface EntityDecoratorOptions {
    url: string,
    method: string,
    serviceName: string,
    __projectId: string
}
export function EntityDecorator (options: EntityDecoratorOptions) {
  return (target: Function) => {
    if (options.url[options.url.length - 1] === '/') {
      const url: any = options.url.split('');
      url.pop();
      options.url = url.join('');
    }
    Object.assign(target.prototype, options);
  };
}


```
该注解需`serviceName, url, method, preUrl, __projectId`五个参数，其中preUrl在实际应用时应结合 Angular 的 envirement 进行使用，此处主要为
如此使用 EntityDecorator + EntityClass 生成一个接口的 Service:

```TypeScript 
import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  serviceName: 'Get',
  url: '/',
  method: 'get',
  __projectId: '5aba151166dc89079e232310' //主要为多项目时区分url使用
})
export class DemoProjectGetDataService extends EntityClass {

}
```

至此您可能会问，如此不是每次修改 Easy-mock 内的接口，还是需要修改对应 EntityService 内注解的参数吗？但是现在每个接口都是独立的一个 EntityService ，可以快速的重写 EntityService.responseResolver 方法实现对特定接口的全局统一处理，或是使用其他 Service 结合 EntityService 实现面向对象，最重要的是 EntityService 内注解的参数的修改可从 Easy-mock 内同步，降低人工修改成本。

## 从 Easy-mock 内同步 EntityService 注解参数
上文注解内需要`serviceName, url, method, __projectId`四个参数，Easy-mock 提供了 URL, method 两个参数，__projectId 则对应 Easy-mock内的项目id，serviceName 可从 URL + method 进行生成，但当 URL 或 method 改变时 EntityService 的名称也会跟着改变，所以我们对 Easy-mock（基于v1.4.0） 增加了 serviceName 属性以对应注解内的 serviceName。

github:https://github.com/supperdsj/easy-mock/tree/master

之后我们只需编写脚本 createService.js 通过 Http 请求从 Easy-mock 读取数据并生成 EntityService ，并生成了 RequestsDataService 管理所有 EntityService 并将全部生成的 Service 放在数组 RequestsDataServicesDepends 内简化依赖注入，代码如下：

```JavaScript

const axios = require('axios');
const fs = require('fs');
const child_process = require('child_process');
const config = require(process.cwd() + '/createServiceConfig.json');
const projects = config.projects;
const path = process.cwd() + '/' + config.path + '/services';
const username = config.username;
const password = config.password;
const mockServer = config.mockServer;

const serviceArray = [];

const upperCaserForFirstLetter = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

const lowerCaserForFirstLetter = (str) => {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
};

const getToken = async (username, password) => {
    return (await axios.post(`${mockServer}/api/u/login`, {
        name: username,
        password: password
    })).data.data
};
const getMocksByProject = async (projectId) => {
    return (await axios.get(`${mockServer}/api/mock?project_id=${projectId}&page_size=2000&page_index=1`)).data.data
};

const saveService = (mock, project) => {
    // console.log();
    mock.serviceName = mock.serviceName||((mock.method + mock.url).split('/').filter(str => str.indexOf(':') < 0 && str.trim() !== '').map(upperCaserForFirstLetter)).join('');
    // console.log(mock);
    const temp =
        `/* 
    ${JSON.stringify(mock)}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '${mock.url}',
  method: '${mock.method}',
  serviceName: '${upperCaserForFirstLetter(mock.serviceName)}',
  preUrl: '${config.baseUrl}${project.url}',
  __projectId: '${project._id}'
})
export class ${upperCaserForFirstLetter(project.name)}${upperCaserForFirstLetter(mock.serviceName)}DataService extends EntityClass {

}
`;
    const fileName = `${path}/${project.name}/${project.name}-${upperCaserForFirstLetter(mock.serviceName)}-data-service.ts`;
    fs.appendFileSync(fileName, temp);
    console.log(`${mock.serviceName} saved`);
    serviceArray.push({
        serviceName: `${upperCaserForFirstLetter(project.name)}${upperCaserForFirstLetter(mock.serviceName)}DataService`,
        filePath: `./${project.name}/${project.name}-${upperCaserForFirstLetter(mock.serviceName)}-data-service`
    });
};
const buildServices = async () => {
    let userInfo = await getToken(username, password);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
    child_process.execSync(`rm -rf ${path}`);
    fs.mkdirSync(path);
    for (let project of projects) {
        fs.mkdirSync(`${path}/${project.name}`);
        let resp = await getMocksByProject(project.id);
        for (let mock of resp.mocks) {
            saveService(mock, Object.assign(resp.project, {name: project.name, title: project.title}));
        }
    }
};

const buildModule = (serviceArray) => {
        let serviceConstructors = serviceArray.map(s => `private ${lowerCaserForFirstLetter(s.serviceName)}: ${s.serviceName}`).join(',\n');
        let serviceImports = serviceArray.map(s => `import {${s.serviceName}} from '${s.filePath}';`).join('\n');
        let moduleProivdes = serviceArray.map(s => s.serviceName).join(',\n');
        let requestsServiceArrayConfig = serviceArray.map(s => `{name: '${lowerCaserForFirstLetter(s.serviceName)}', service: ${lowerCaserForFirstLetter(s.serviceName)}}`);
        let serviceTemp = `import {Injectable} from '@angular/core';
${serviceImports}
@Injectable()
export class RequestsDataService {
  requestsServiceArray = [];
  constructor(${serviceConstructors}) {
    this.requestsServiceArray = [${requestsServiceArrayConfig.join(',\n')}];
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
export let RequestsDataServicesDepends = [${moduleProivdes},\nRequestsDataService];
`;
        const serviceFileName = `${path}/requests-data-service.ts`;
        fs.appendFileSync(serviceFileName, serviceTemp);
    }
;
buildServices().then(() => {
    console.log('\nService build success');
    buildModule(serviceArray);
}).catch((e) => {
    console.log(e);
});

```

上述代码对应配置文件 createServiceConfig.json 如下:

```json
{
  "username": "emnsl",
  "password": "111111",
  "path": "src/entityService",
  "mockServer": "https://www.easy-mock.com",
  "projects": [
    {
      "title": "demo",
      "name": "demoProject",
      "id": "5aba151166dc89079e232310"
    }
  ]
}
```

之后只需配置 createServiceConfig.json 内的各个参数执行 createService.js 即可从 Easy-mock 读取接口配置并生成 EntityService 供 angular 使用。

## 范例
github：https://github.com/supperdsj/easy-mock-service-loader
example 内的范例项目使用 angular-cli 搭建，使用时拷贝 dist 内文件到项目目录下，修改 createServiceConfig.json 内的各配置对应 Easy-mock 项目的配置安装依赖后即可执行 npm run start。

## 结语
本文主要基于 Angular 实现该思想，欢迎实现其他语言的同类工具来我的[博客](http://blog.dongsj.cn) http://blog.dongsj.cn 留言。
博客新开欢迎访问留言，之后还会继续更新，下期应该预计应该是使用 Component 类继承和 EntityService 管理端页面的开发。


