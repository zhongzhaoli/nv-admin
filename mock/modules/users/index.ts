import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson, ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';
import { PREFIX } from '../../constant';

export default [
  {
    url: `${PREFIX}/system/users`,
    method: 'get',
    timeout: 500,
    response: ({ query, headers }): ResponsePageJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
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
    url: `${PREFIX}/system/users`,
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      console.log('users: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/users/:id`,
    method: 'put',
    timeout: 500,
    response: ({ headers, body, query }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      if (!query.id)
        return {
          code: ResponseCode.ERROR,
          data: {},
          msg: '找不到此用户'
        };
      console.log(`users(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/users/:id`,
    method: 'delete',
    timeout: 500,
    response: ({ headers, query }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      if (!query.id)
        return {
          code: ResponseCode.ERROR,
          data: {},
          msg: '找不到此角色'
        };
      console.log(`users(ID:${query.id}): 删除`);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
