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
          icon: 'ri-home-5-line',
          affix: true
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
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'ri-user-line'
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'ri-admin-line'
        }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'ri-node-tree',
          keepAlive: true
        }
      },
      {
        path: 'monitor',
        name: 'SystemMonitor',
        component: () => import('@/views/system/monitor/index.vue'),
        meta: {
          title: '系统监控',
          icon: 'ri-computer-line'
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
