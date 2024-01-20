import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson, ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';

export default [
  {
    url: '/role',
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
      const total = 5;
      const list = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            name: '@name',
            description: '@cword(5, 20)',
            status: '@pick([1, 2])',
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
    url: '/role',
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      console.log('role: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  },
  {
    url: '/role/:id',
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
          msg: '找不到此角色'
        };
      console.log(`role(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  },
  {
    url: '/role/:id',
    method: 'delete',
    timeout: 500,
    response: ({ headers, query }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      if (!query.id)
        return {
          code: ResponseCode.ERROR,
          msg: '找不到此角色'
        };
      console.log(`role(ID:${query.id}): 删除`);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
