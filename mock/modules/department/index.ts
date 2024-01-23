import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson, ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';
import { PREFIX } from '../../constant';

export default [
  {
    url: `${PREFIX}/system/department`,
    method: 'get',
    timeout: 500,
    response: ({ query, headers }): ResponsePageJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      if (query.page) {
        const pageSize = parseInt(query.pageSize) || 10;
        const page = parseInt(query.page) || 1;
        const total = 10;
        const list = Mock.mock({
          [`list|${pageSize}`]: [
            {
              id: '@id',
              name: '@cname',
              avatar: '@image',
              createUser: '@cname',
              memberCount: '@integer(1, 100)',
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
      } else {
        const list = Mock.mock({
          'list|15': [
            {
              id: '@id',
              name: '@cname',
              avatar: '@image',
              createUser: '@cname',
              memberCount: '@integer(1, 100)',
              description: '@cword(5, 20)',
              status: '@pick([1, 2])',
              createTime: '@datetime',
              updateTime: '@datetime'
            }
          ]
        }).list;
        return {
          code: ResponseCode.SUCCESS,
          data: list,
          msg: '请求成功'
        };
      }
    }
  },
  {
    url: `${PREFIX}/system/department`,
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      console.log('department: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/department/:id`,
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
          msg: '找不到此部门'
        };
      console.log(`department(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/department/:id`,
    method: 'delete',
    timeout: 500,
    response: ({ headers, query }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        };
      }
      if (!query.id)
        return {
          code: ResponseCode.ERROR,
          msg: '找不到此部门'
        };
      console.log(`department(ID:${query.id}): 删除`);
      return {
        code: ResponseCode.SUCCESS,
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];