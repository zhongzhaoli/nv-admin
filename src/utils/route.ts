import { whiteListByPath } from '@/config/route';
import router from '@/router';
import { resolve } from 'path-browserify';
import { RouteRecordRaw } from 'vue-router';

// 判断路由是否在面登录白名单内
export const isLoginWhiteList = (path: string): boolean => {
  return whiteListByPath.includes(path);
};

// 注册路由
export const addRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach((route) => {
    router.addRoute(route);
  });
};

// 删除需要隐藏的菜单
export const removeHiddenMenus = (
  routes: RouteRecordRaw[],
  basePath = ''
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const tmp = {
      ...route,
      path: resolve(basePath, route.path)
    };
    // 需要隐藏的菜单，不显示
    if (tmp.meta && tmp.meta.hidden) return;
    // 递归处理子菜单
    if (tmp.children && tmp.children.length) {
      tmp.children = removeHiddenMenus(tmp.children, tmp.path);
    }
    res.push(tmp);
  });
  return res;
};

// 处理children只有一个的跟路由 仅留下子路由
export const onlyChildRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    // 处理alwaysShow
    if (route.meta && route.meta.alwaysShow) return res.push({ ...route });
    // 递归处理子菜单
    if (route.children && route.children.length === 1) {
      // 只取第一个子路由
      const childRoute = onlyChildRoutes(route.children)[0];
      res.push(childRoute);
    } else {
      const tmp = { ...route };
      if (tmp.children) {
        tmp.children = onlyChildRoutes(tmp.children);
      }
      res.push(tmp);
    }
  });
  return res;
};
