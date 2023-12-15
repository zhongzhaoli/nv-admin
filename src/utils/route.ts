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

// 处理侧边栏展示路由数据
export const handleRoutes = (
  routes: RouteRecordRaw[],
  basePath = ''
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const newPath = resolve(basePath, route.path);
    // 需要隐藏的菜单，不显示
    if (route.meta && route.meta.hidden) return;
    // 目录菜单重定向到第一个子路由
    if (route.children && route.children.length > 0) {
      route.redirect = resolve(newPath, route.children[0].path);
    }
    // 只有一个children 只展示children
    if (
      (!route.meta || !route.meta.alwaysShow) &&
      route.children &&
      route.children.length === 1
    ) {
      // 只取第一个子路由
      const childRoute = handleRoutes(route.children, newPath)[0];
      res.push(childRoute);
    } else {
      const tmp = { ...route, path: newPath };
      if (tmp.children) {
        tmp.children = handleRoutes(tmp.children, newPath);
      }
      res.push(tmp);
    }
  });
  return res;
};
