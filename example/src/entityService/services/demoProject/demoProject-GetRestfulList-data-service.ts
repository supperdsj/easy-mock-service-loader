/* 
    {"_id":"5aba151166dc89079e232314","url":"/restful/:id/list","method":"get","description":"支持 restful 的 mock，替换 id 试试","mode":"{\"success\":true,\"data\":[{\"user\":{\"name\":\"演示用\"}}]}","serviceName":"GetRestfulList"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/restful/:id/list',
  method: 'get',
  serviceName: 'GetRestfulList',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectGetRestfulListDataService extends EntityClass {

}
