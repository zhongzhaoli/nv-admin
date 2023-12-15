import mitt, { type Handler } from 'mitt';
import { onBeforeUnmount } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

// 采用订阅->发布模式（发布者，订阅者，信息系统）
// 路由变化 发布信息 接收信息
const emitter = mitt();
const key = Symbol('ROUTE_CHANGE');
let latestRoute: RouteLocationNormalized;

type Callback = (route: RouteLocationNormalized) => void;

// 信息系统 接收发布者信息，传递给订阅者
export const routeChange = (to: RouteLocationNormalized) => {
  // 发布信息
  emitter.emit(key, to);
  // 记录当前路由信息
  latestRoute = to;
};

// 订阅者 通过函数式编程，可以生成多个订阅者
export function useRouteListener() {
  // 订阅者池
  const callbackList: Callback[] = [];

  // 创建订阅者
  const addRouteListener = (callback: Callback, immediate = false) => {
    // 将订阅者添加到订阅者池
    callbackList.push(callback);
    // 订阅者接收发布者信息
    emitter.on(key, callback as Handler);
    // 可选首次立即执行
    immediate && latestRoute && callback(latestRoute);
  };

  // 销毁整个订阅者
  const removeRouteListener = (callback: Callback) => {
    emitter.off(key, callback as Handler);
  };
  // 组件销毁时，移除所有订阅者
  onBeforeUnmount(() => {
    for (let i = 0; i < callbackList.length; i++) {
      removeRouteListener(callbackList[i]);
    }
  });

  return { addRouteListener, removeRouteListener };
}
