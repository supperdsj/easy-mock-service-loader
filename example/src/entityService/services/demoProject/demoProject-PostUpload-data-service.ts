/* 
    {"_id":"5aba151166dc89079e232312","url":"/upload","method":"post","description":"这只是一个响应 post 接口返回随机数据的例子","mode":"{ data: { img: function({ _req, Mock }) { return _req.body.fileName + \"_\" + Mock.mock(\"@image\") }}}","serviceName":"PostUpload"}
*/

import {Injectable} from '@angular/core';
import {EntityClass} from '../../entity.class';
import {EntityDecorator} from '../../entity.decorator';

@Injectable()
@EntityDecorator({
  url: '/upload',
  method: 'post',
  serviceName: 'PostUpload',
  __projectId: '5aba151166dc89079e232310'
})
export class DemoProjectPostUploadDataService extends EntityClass {

}
