import { createRouter, type RouteRecordRaw } from 'vue-router';
import { history } from './helper';
import Layout from '@/layouts/index.vue';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {}
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    meta: {},
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {}
      }
    ]
  }
];

const router = createRouter({
  history,
  routes: [...staticRoutes]
});

export default router;
