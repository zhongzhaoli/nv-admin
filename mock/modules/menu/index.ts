import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson } from '../../types';
import { isLogin } from '../../utils';
import { PREFIX } from '../../constant';

const menus = [
  {
    id: 1,
    pid: 0,
    path: 'dashboard',
    name: 'Dashboard',
    component: 'dashboard/index.vue',
    meta: {
      keepAlive: true,
      title: '数据看板',
      icon: 'ri-dashboard-line',
      type: 'SINGLEMENU',
      sort: 1,
      hidden: false,
      affix: false
    }
  },
  {
    id: 8,
    pid: 0,
    path: 'todoList',
    name: 'TodoList',
    component: 'todoList/index.vue',
    meta: {
      keepAlive: false,
      title: '待办事项',
      icon: 'ri-task-line',
      type: 'SINGLEMENU',
      sort: 1,
      hidden: false,
      affix: false
    }
  },
  {
    id: 7,
    pid: 0,
    path: 'notification',
    name: 'Notification',
    component: 'Layout',
    meta: {
      title: '信息通知',
      hidden: true,
      icon: 'ri-notification-4-line',
      type: 'CATA'
    },
    children: [
      {
        id: 71,
        pid: 7,
        path: 'list',
        name: 'NotificationList',
        component: 'notification/index.vue',
        meta: {
          keepAlive: false,
          title: '通知列表',
          type: 'MENU',
          sort: 1,
          hidden: false,
          affix: false
        }
      },
      {
        id: 72,
        pid: 7,
        path: 'detail/:id',
        name: 'NotificationDetail',
        component: 'notification/detail.vue',
        meta: {
          keepAlive: true,
          title: '通知详情',
          type: 'MENU',
          sort: 1,
          hidden: false,
          affix: false
        }
      },
      {
        id: 73,
        pid: 7,
        path: 'create',
        name: 'NotificationCreate',
        component: 'notification/create.vue',
        meta: {
          keepAlive: true,
          title: '发布通知',
          type: 'MENU',
          sort: 1,
          hidden: false,
          affix: false
        }
      }
    ]
  },
  {
    id: 2,
    pid: 0,
    path: '/system',
    name: 'System',
    component: 'Layout',
    meta: {
      title: '系统管理',
      icon: 'ri-list-settings-line',
      type: 'CATA',
      sort: 2,
      hidden: false,
      keepAlive: false,
      affix: false
    },
    children: [
      {
        id: 3,
        pid: 2,
        path: 'user',
        name: 'SystemUser',
        component: 'system/user/index.vue',
        meta: {
          title: '用户管理',
          icon: 'ri-user-line',
          keepAlive: true,
          type: 'MENU',
          sort: 1,
          hidden: false,
          affix: false
        }
      },
      {
        id: 4,
        pid: 2,
        path: 'department',
        name: 'SystemDepartment',
        component: 'system/department/index.vue',
        meta: {
          title: '部门管理',
          icon: 'ri-computer-line',
          type: 'MENU',
          sort: 4,
          keepAlive: true,
          hidden: false,
          affix: false
        }
      },
      {
        id: 5,
        pid: 2,
        path: 'role',
        name: 'SystemRole',
        component: 'system/role/index.vue',
        meta: {
          title: '角色管理',
          icon: 'ri-admin-line',
          keepAlive: true,
          type: 'MENU',
          sort: 2,
          hidden: false,
          affix: false
        }
      },
      {
        id: 6,
        pid: 2,
        path: 'menu',
        name: 'SystemMenu',
        component: 'system/menu/index.vue',
        meta: {
          title: '菜单管理',
          icon: 'ri-node-tree',
          keepAlive: true,
          type: 'MENU',
          sort: 3,
          hidden: false,
          affix: false
        }
      }
    ]
  }
];

export default [
  {
    url: `${PREFIX}/system/menu`,
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
        data: menus,
        msg: '获取成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/menu`,
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
      console.log('menu: 新增', body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/menu/:id`,
    method: 'patch',
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
          msg: '找不到此菜单'
        };
      console.log(`menu(ID：${query.id}): 修改`, body);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  },
  {
    url: `${PREFIX}/system/menu/:id`,
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
          msg: '找不到此菜单'
        };
      console.log(`menu(ID:${query.id}): 删除`);
      return {
        code: ResponseCode.SUCCESS,
        data: {},
        msg: '操作成功'
      };
    }
  }
] as MockMethod[];
