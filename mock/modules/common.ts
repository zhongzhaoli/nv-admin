import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson } from '../types';
import { isLogin } from '../utils';
import Mock from 'mockjs';
import { PREFIX } from '../constant';

export default [
  {
    url: `${PREFIX}/common/fileUpload`,
    method: 'post',
    timeout: 1000,
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      const data = Mock.mock({
        avatar: '@image'
      });
      return {
        code: ResponseCode.SUCCESS,
        data: data.avatar,
        msg: '获取成功'
      };
    }
  }
] as MockMethod[];
