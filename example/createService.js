#!/usr/bin/env node

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
