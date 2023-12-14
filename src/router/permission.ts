import { addRoutes, isLoginWhiteList } from '@/utils/route';
import router from './index';
import { useUserStore } from '@/store/modules/user';
import { useRouterStore } from '@/store/modules/router';

router.beforeEach(async (to, from, next) => {
  const routerStore = useRouterStore();
  const userStore = useUserStore();
  // 如果用户没有登录
  if (!userStore.token) {
    // 如果跳转的页面在免登录白名单内，直接跳转
    if (isLoginWhiteList(to.path)) {
      next();
    } else {
      // 否则代表没有权限，直接到登录页面
      next('/login');
    }
    return;
  }
  // 如果用户已经登录了，准备进入login界面，则跳转到首页
  if (to.path === '/login') {
    return next({ path: '/' });
  }

  if (userStore.userInfo) {
    return next();
  } else {
    // 模拟异步获取用户信息
    await userStore.setUserInfo({
      username: 'admin',
      email: '123@qq.com',
      phone: '12345678901',
      avatar: 'https://avatars.githubusercontent.com/u/38655719?v=4'
    });
    // 模拟异步获取路由信息
    const asyncRoutes = await routerStore.getRoutes();
    addRoutes(asyncRoutes);
    return next(to.path);
  }
});