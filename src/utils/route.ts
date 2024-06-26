import { whiteListByPath } from '@/config/route';
import router from '@/router';
import { TagView } from '@/store/modules/tagsView';
import { resolve } from 'path-browserify';
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

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

// 路由组件路径实例化
export const routesComponentInstance = (routes: any): RouteRecordRaw[] => {
  routes.forEach((route: any) => {
    if (route.component === 'Layout') {
      route.component = Layout;
    } else {
      const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}');
      route.component = dynamicImport(dynamicViewsModules, route.component);
    }
    if (route.children && route.children.length)
      routesComponentInstance(route.children);
  });
  return routes as RouteRecordRaw[];
};

// 动态引入组件
const dynamicImport = (
  dynamicViewsModules: Record<string, () => Promise<any>>,
  component: string
) => {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '');
    const startFlag = component.startsWith('/');
    const startIndex = startFlag ? 0 : 1;
    return k.substring(startIndex, k.length) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  console.warn('找不到此组件');
};

// 合并相同path的children r1为主，r2合并入r1
export const mergeRoutes = (r1: RouteRecordRaw[], r2: RouteRecordRaw[]) => {
  // 第一步：静动态合并
  r2.forEach((route2: RouteRecordRaw) => {
    const route1 = r1.find((route) => route.path === route2.path);
    if (route1) {
      if (!route1.children) {
        route1.children = [route2];
      } else {
        route1.children = [...(route2.children || []), ...route1.children];
      }
      // 默认跳转children的第一个路由
      route1.redirect = route1.children[0].path;
    }
  });
  // 第二步：动态同path合并（第一级）
  const newR1: RouteRecordRaw[] = [];
  r1.forEach((item) => {
    const { path, children } = item;
    const route = newR1.find((v) => v.path === path);
    if (route) {
      route.children = [...(route.children || []), ...(children || [])];
    } else {
      newR1.push(item);
    }
  });
  return newR1;
};

// 判断children中是否只有一个需要展示路由
const handleChildrenOnlyOneShow = (
  list: RouteRecordRaw[]
): RouteRecordRaw | null => {
  if (!list.length) return null;
  if (list.length === 1) return list[0];
  const showList = list.filter(
    (item) =>
      item.meta &&
      (item.meta.hidden === undefined || item.meta.hidden === false)
  );
  if (showList.length === 1) return showList[0];
  else return null;
};

// 处理侧边栏展示路由数据
export const handleRoutes = (
  routes: RouteRecordRaw[],
  basePath = ''
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const newPath = resolve(basePath, route.path);
    // 目录菜单重定向到第一个子路由
    if (route.children && route.children.length > 0) {
      route.redirect = resolve(newPath, route.children[0].path);
    }
    // 需要隐藏的菜单，不显示
    if (route.meta && route.meta.hidden) return;

    // 只有一个children 只展示children
    const onlyOneShow: RouteRecordRaw | null = route.children
      ? handleChildrenOnlyOneShow(route.children)
      : null;
    if (
      (!route.meta || !route.meta.alwaysShow) &&
      route.children &&
      onlyOneShow
    ) {
      // 只取第一个子路由
      const childRoute = handleRoutes([onlyOneShow], newPath)[0];
      if (childRoute) {
        res.push(childRoute);
      }
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

// 跳转到最后一个页面
export const toLastView = (visitedViews: TagView[]) => {
  // 没有页面了，跳转到首页
  if (visitedViews.length === 0) return router.push('/');
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.path)
    return router.push({ path: latestView.path, query: latestView.query });
};
