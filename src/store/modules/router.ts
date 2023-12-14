import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { asyncRoutes as aR } from '@/router';

export const useRouterStore = defineStore('router', () => {
  // 动态获取的路由
  const asyncRoutes = ref<RouteRecordRaw[]>([]);

  const getRoutes = async () => {
    // 模拟异步获取路由
    asyncRoutes.value = aR;
    return aR;
  };

  return { asyncRoutes, getRoutes };
});
