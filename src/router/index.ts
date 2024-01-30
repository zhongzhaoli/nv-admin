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
          keepAlive: true,
          icon: 'ri-home-5-line',
          affix: true
        }
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
          title: '404',
          showTagsView: false,
          hidden: true
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
