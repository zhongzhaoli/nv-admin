import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson, ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';

export default [
  {
    url: '/users',
    method: 'get',
    timeout: 500,
    response: ({ query, headers }): ResponsePageJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      const pageSize = parseInt(query.pageSize) || 10;
      const page = parseInt(query.page) || 1;
      const total = 34;
      const list = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            username: '@name',
            avatar: '@image',
            phone: /^1[34578]\d{9}$/,
            status: '@pick([1, 2])',
            role: '@cword(2, 5)',
            realName: '@cword(2, 3)',
            createTime: '@datetime',
            updateTime: '@datetime'
          }
        ]
      }).list;
      return {
        code: ResponseCode.SUCCESS,
        data: {
          list,
          total,
          page,
          pageSize
        },
        msg: '请求成功'
      };
    }
  },
  {
    url: '/users',
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      console.log('users: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  },
  {
    url: '/users/:id',
    method: 'put',
    timeout: 500,
    response: ({ headers, body, query }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      if (!query.id)
        return {
          code: ResponseCode.ERROR,
          msg: '找不到此用户'
        };
      console.log(`users(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
