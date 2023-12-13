import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    // 面包屑和侧边栏菜单的标题
    title?: string;
  }
}
