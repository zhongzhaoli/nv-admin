import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson, ResponsePageJson } from '../../types';
import { isLogin } from '../../utils';
import Mock from 'mockjs';
import { PREFIX } from '../../constant';

export default [
  {
    url: `${PREFIX}/notification`,
    method: 'get',
    timeout: 500,
    response: ({ headers, query }): ResponsePageJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      const pageSize = parseInt(query.pageSize) || 10;
      const page = parseInt(query.page) || 1;
      const total = 100;
      const list = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            title: '@cword(1,20)',
            active: '@pick(true, false)',
            read: page === 1 ? false : true,
            createTime: '@datetime',
            timestamp: '@date',
            avatar: '@image',
            author: '@cname'
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
    url: `${PREFIX}/notification/:id`,
    method: 'get',
    timeout: 500,
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          data: {},
          msg: '用户未登录'
        };
      }
      return {
        code: ResponseCode.SUCCESS,
        data: {
          id: '@id',
          content: `<p>10 行代码即可创建一个功能健全的富文本编辑器。</p><pre><code class="language-javascript">import '@wangeditor/editor/dist/css/style.css'
          import { createEditor, createToolbar } from '@wangeditor/editor'
          
          // 创建编辑器
          const editor = createEditor({
            selector: '#editor-container'
          })
          // 创建工具栏
          const toolbar = createToolbar({
            editor,
            selector: '#toolbar-container'
          })</code></pre><p>这样就可以了。</p>`,
          title: '@cword(1,20)',
          active: '@pick(true, false)',
          read: true,
          createTime: '@datetime',
          timestamp: '@date',
          avatar: '@image',
          author: '@cname'
        },
        msg: '请求成功'
      };
    }
  },
  {
    url: `${PREFIX}/notification`,
    method: 'post',
    timeout: 500,
    response: ({ headers, body }): ResponseJson => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        } as ResponsePageJson;
      }
      console.log('notification: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
