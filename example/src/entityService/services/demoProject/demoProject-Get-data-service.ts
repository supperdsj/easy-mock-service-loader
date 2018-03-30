/* 
    {"_id":"5aba151166dc89079e232317","url":"/","method":"get","description":"自定义响应的 mock","mode":"{success: true, data: {name: \"hh\"}, _res: {status: 400, data: {success: false}, cookies: {test: \"true\"}, headers: {Power: \"easy-mock\"}}}","serviceName":"Get"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/',
  method: 'get',
  serviceName: 'Get',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectGetDataService extends EntityClass {

}
