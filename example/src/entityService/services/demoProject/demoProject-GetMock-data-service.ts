/* 
    {"_id":"5aba151166dc89079e232316","url":"/mock","method":"get","description":"带随机数据的 mock","mode":"{\"success\":true,\"data\":{\"projects|3-10\":[{\"name\":\"演示用\",\"url\":\"@url\",\"email\":\"@email\",\"address\":\"@county(true)\",\"string|1-10\":\"★\",\"number|1-100\":100,\"boolean|1-2\":true,\"object|2\":{\"310000\":\"上海市\",\"320000\":\"江苏省\",\"330000\":\"浙江省\"}}]}}","serviceName":"GetMock"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/mock',
  method: 'get',
  serviceName: 'GetMock',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectGetMockDataService extends EntityClass {

}
