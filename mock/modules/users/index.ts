import { MockMethod } from 'vite-plugin-mock';
import { ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';

export default [
  {
    url: '/user/getList',
    method: 'get',
    timeout: 500,
    response: ({ query, headers }): ResponsePageJson => {
      if (!isLogin(headers)) {
        return {
          code: 401,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      const pageSize = parseInt(query.pageSize) || 10;
      const page = parseInt(query.page) || 1;
      const total = 34;
      const list = Mock.mock({
        [`list|${pageSize}`]: [
          {
            username: '@name',
            avatar: '@image',
            phone: /^1[34578]\d{9}$/,
            status: '@boolean',
            role: '@cword(2, 5)',
            createTime: '@datetime',
            updateTime: '@datetime'
          }
        ]
      }).list;
      return {
        code: 0,
        data: {
          list,
          total,
          page,
          pageSize
        },
        msg: '请求成功'
      };
    }
  }
] as MockMethod[];
