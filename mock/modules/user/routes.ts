import { MockMethod } from 'vite-plugin-mock';
import { ResponseCode, ResponseJson } from '../../types';
import { isLogin } from '../../utils';
import { PREFIX } from '../../constant';

const routes = [
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: 'dashboard/index.vue',
        meta: {
          keepAlive: true,
          title: '数据看板',
          icon: 'ri-dashboard-line'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
    children: [
      {
        path: 'todoList',
        name: 'TodoList',
        component: 'todoList/index.vue',
        meta: {
          keepAlive: true,
          title: '待办事项',
          icon: 'ri-task-line'
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: 'Layout',
    meta: {
      title: '系统管理',
      icon: 'ri-list-settings-line'
    },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: 'system/user/index.vue',
        meta: {
          title: '用户管理',
          icon: 'ri-user-line',
          keepAlive: true
        }
      },
      {
        path: 'department',
        name: 'SystemDepartment',
        component: 'system/department/index.vue',
        meta: {
          title: '部门管理',
          icon: 'ri-computer-line',
          keepAlive: true
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: 'system/role/index.vue',
        meta: {
          title: '角色管理',
          icon: 'ri-admin-line',
          keepAlive: true
        }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: 'system/menu/index.vue',
        meta: {
          title: '菜单管理',
          icon: 'ri-node-tree',
          keepAlive: true
        }
      }
    ]
  }
];

export default [
  {
    url: `${PREFIX}/routes`,
    method: 'get',
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: ResponseCode.UNAUTHORIZED,
          msg: '用户未登录'
        };
      }
      return {
        code: ResponseCode.SUCCESS,
        data: routes,
        msg: '获取成功'
      };
    }
  }
] as MockMethod[];
