import { createRouter, type RouteRecordRaw } from 'vue-router';
import { history } from './helper';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {}
  }
];

const router = createRouter({
  history,
  routes: [...staticRoutes]
});

export default router;
