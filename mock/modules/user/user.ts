import { MockMethod } from 'vite-plugin-mock';
import { UserToken } from './login';
import { ResponseCode, ResponseJson } from '../../types';
import { isLogin } from '../../utils';
import { PREFIX } from '../../constant';

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
    url: `${PREFIX}/userInfo`,
    method: 'get',
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      const token = headers.authorization.split('Bearer ')[1];
      const user = userInfoArr.find((item) => item.token === token);
      if (!user) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未找到'
        };
      }
      const data = user.userInfo;
      return {
        code: ResponseCode.SUCCESS,
        data,
        msg: '获取成功'
      };
    }
  },
  {
    url: `${PREFIX}/changePassword`,
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      const { newPassword, oldPassword, confirmPassword } = body;
      if (newPassword !== confirmPassword) {
        return {
          code: ResponseCode.ERROR,
          data: {},
          msg: '两次输入密码不一致'
        };
      }
      console.log(`修改密码：旧${oldPassword}，新${newPassword}`);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '修改成功'
      };
    }
  }
] as MockMethod[];
