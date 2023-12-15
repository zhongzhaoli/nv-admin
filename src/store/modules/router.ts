import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { asyncRoutes as aR, staticRoutes } from '@/router';
import { handleRoutes } from '@/utils/route';

export const useRouterStore = defineStore('router', () => {
  // 动态获取的路由
  const asyncRoutes = ref<RouteRecordRaw[]>([]);
  // 处理后的数据
  // 1、合并静态路由和动态路由
  // 2、hidden删除
  // 3、alwaysShow展示
  // 4、children只有一个时，只展示children
  const handledRoutes = ref<RouteRecordRaw[]>([]);

  const getRoutes = async () => {
    // 模拟异步获取路由
    asyncRoutes.value = aR;
    // 处理数据
    handledRoutes.value = handleRoutes([...staticRoutes, ...asyncRoutes.value]);
    return aR;
  };

  return { asyncRoutes, getRoutes, handledRoutes };
});
