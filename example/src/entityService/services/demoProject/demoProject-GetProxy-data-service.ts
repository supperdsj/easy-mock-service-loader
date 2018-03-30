/* 
    {"_id":"5aba151166dc89079e232315","url":"/proxy","method":"get","description":"支持接口代理的 mock，试试在 url 上加 ?s={数字}","mode":"https://api.m.sohu.com/autonews/pool/?n=%E6%96%B0%E9%97%BB&s=1","serviceName":"GetProxy"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/proxy',
  method: 'get',
  serviceName: 'GetProxy',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectGetProxyDataService extends EntityClass {

}
