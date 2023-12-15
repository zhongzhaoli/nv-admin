import { createRouter, type RouteRecordRaw } from 'vue-router';
import { history } from './helper';
import Layout from '@/layouts/index.vue';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/workbenches',
    children: [
      {
        path: 'workbenches',
        name: 'Workbenches',
        component: () => import('@/views/workbenches/index.vue'),
        meta: {
          title: '工作台',
          icon: 'ri-home-5-line'
        }
      }
    ]
  }
];

// 动态路由 - 假装是后端返回的
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/dashboard/index.vue'),
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
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'ri-list-settings-line'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'ri-user-line'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'ri-admin-line'
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'ri-node-tree'
        }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/system/monitor/index.vue'),
        meta: {
          title: '系统监控',
          icon: 'ri-computer-line'
        }
      }
    ]
  },
  {
    path: '/manyMenu',
    name: 'ManyMenu',
    component: Layout,
    meta: {
      title: '多级路由'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/system/menu/index.vue'),
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            component: () => import('@/views/system/menu/index.vue'),
            meta: {
              title: '菜单1-1'
            }
          }
        ],
        meta: {
          title: '菜单1',
          alwaysShow: true
        }
      }
    ]
  }
];

const router = createRouter({
  history,
  routes: staticRoutes
});

export default router;
