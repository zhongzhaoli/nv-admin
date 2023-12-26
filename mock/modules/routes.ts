import { MockMethod } from 'vite-plugin-mock';
import { ResponseJson } from '../types';
import { isLogin } from '../utils';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: 'Layout',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => '@/views/dashboard/index.vue',
        meta: {
          title: '数据看板',
          icon: 'ri-dashboard-line'
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
        component: () => '@/views/system/user/index.vue',
        meta: {
          title: '用户管理',
          icon: 'ri-user-line'
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => '@/views/system/role/index.vue',
        meta: {
          title: '角色管理',
          icon: 'ri-admin-line'
        }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => '@/views/system/menu/index.vue',
        meta: {
          title: '菜单管理',
          icon: 'ri-node-tree',
          keepAlive: true
        }
      },
      {
        path: 'monitor',
        name: 'SystemMonitor',
        component: () => '@/views/system/monitor/index.vue',
        meta: {
          title: '系统监控',
          icon: 'ri-computer-line'
        }
      }
    ]
  }
];

export default [
  {
    url: '/routes',
    method: 'get',
    response: ({ headers }): ResponseJson<any> => {
      if (!isLogin(headers)) {
        return {
          code: 401,
          msg: '用户未登录'
        };
      }
      return {
        code: 0,
        data: routes,
        msg: '获取成功'
      };
    }
  }
] as MockMethod[];
