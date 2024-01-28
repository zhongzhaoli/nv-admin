import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';
import { PREFIX } from '../../constant';

const list = Mock.mock({
  'list|15': [
    {
      id: '@id',
      title: '@cword(1,20)',
      active: '@pick(true, false)',
      createTime: '@datetime'
    }
  ]
}).list;

export default [
  {
    url: `${PREFIX}/todoList`,
    method: 'get',
    response: ({ headers }): ResponseJson<{ list: any[]; end: any[] }> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        } as ResponseJson;
      }
      const newList = list.filter((item) => !item.active);
      const endList = list.filter((item) => item.active);
      return {
        code: ResponseCode.SUCCESS,
        data: {
          list: newList,
          end: endList
        },
        msg: '请求成功'
      };
    }
  },
  {
    url: `${PREFIX}/todoList`,
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
      console.log('todoList: 新增', body);
      list.push({
        active: false,
        createTime: new Date().toLocaleString(),
        id: Mock.mock('@id'),
        title: body.title
      });
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/todoList/:id`,
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
          msg: '找不到此待办事项'
        };
      const listIndex = list.findIndex((item) => item.id === query.id);
      if (listIndex === -1)
        return {
          code: ResponseCode.ERROR,
          data: {},
          msg: '找不到此待办事项'
        };
      list[listIndex] = {
        ...list[listIndex],
        ...body
      };
      console.log(`todo(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/todoList/:id`,
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
          msg: '找不到此待办事项'
        };
      const listIndex = list.findIndex((item) => item.id === query.id);
      if (listIndex === -1)
        return {
          code: ResponseCode.ERROR,
          data: {},
          msg: '找不到此待办事项'
        };
      list.splice(listIndex, 1);
      console.log(`todo(ID:${query.id}): 删除`);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
