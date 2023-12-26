import { MockMethod } from 'vite-plugin-mock';
import { ResponseJson } from '../types';

export enum UserToken {
  admin = 'admin-token'
}

export default [
  {
    url: '/login',
    method: 'post',
    timeout: 500,
    response: ({ body }): ResponseJson => {
      if (UserToken[body.username]) {
        return {
          code: 0,
          data: UserToken[body.username],
          msg: '登录成功'
        };
      } else {
        return {
          code: 1,
          msg: '账号或密码错误'
        };
      }
    }
  }
] as MockMethod[];
