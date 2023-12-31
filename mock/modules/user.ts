import { MockMethod } from 'vite-plugin-mock';
import { UserToken } from './login';
import { ResponseJson } from '../types';
import { isLogin } from '../utils';

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  realname: string;
  department: string;
  avatar: string;
}

const userInfoArr: Array<{ token: UserToken; userInfo: UserInfo }> = [
  {
    token: UserToken.admin,
    userInfo: {
      username: 'admin',
      email: '525966315@qq.com',
      phone: '13662648176',
      realname: '钟兆立',
      department: '前端开发部',
      avatar: 'https://resource.lstaer.com/0543d7c3-9fda-49d4-ba46-1628f7ee0639'
    }
  }
];

export default [
  {
    url: '/user/userInfo',
    method: 'get',
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: 401,
          msg: '用户未登录'
        };
      }
      const token = headers.authorization.split('Bearer ')[1];
      const user = userInfoArr.find((item) => item.token === token);
      if (!user) {
        return {
          code: 401,
          msg: '用户未找到'
        };
      }
      const data = user.userInfo;
      return {
        code: 0,
        data,
        msg: '获取成功'
      };
    }
  }
] as MockMethod[];
