import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { asyncRoutes as aR, staticRoutes } from '@/router';
import { getRoutes as getRoutesApi } from '@/api/routes';
import { handleRoutes, routesComponentInstance } from '@/utils/route';
import { ResponseJson } from '@/config/request';

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
    const data = (await getRoutesApi()) as ResponseJson<any>;
    // 模拟异步获取路由
    asyncRoutes.value = routesComponentInstance(data.data);
    // 处理数据
    handledRoutes.value = handleRoutes([...staticRoutes, ...asyncRoutes.value]);
    return asyncRoutes.value;
  };

  return { asyncRoutes, getRoutes, handledRoutes };
});
