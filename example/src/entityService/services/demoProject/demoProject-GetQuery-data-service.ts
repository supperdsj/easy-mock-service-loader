/* 
    {"_id":"5aba151166dc89079e232313","url":"/query","method":"get","description":"根据请求参数返回指定数据，试试在 url 上加 ?name={任意值}","mode":"{ success :true, data: { default: \"hah\", _req: function({ _req }) { return _req }, name: function({ _req }) { return _req.query.name || this.default }}}","serviceName":"GetQuery"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/query',
  method: 'get',
  serviceName: 'GetQuery',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectGetQueryDataService extends EntityClass {

}
