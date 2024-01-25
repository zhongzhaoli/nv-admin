import mitt, { type Handler } from 'mitt';
import { onBeforeUnmount } from 'vue';

type Callback<T = any> = (...val: T[]) => void;
const emitter = mitt();

export function useMitt(key: symbol) {
  // 订阅池
  const callbackList: Callback[] = [];

  // 发送信息
  const send = <T>(prop: T) => {
    emitter.emit(key, prop);
  };

  // 接收信息
  const addListener = <T>(callback: Callback<T>) => {
    callbackList.push(callback);
    emitter.on(key, callback as Handler);
  };

  // 卸载监听
  const removeListener = (callback: Callback) => {
    emitter.off(key, callback as Handler);
  };

  onBeforeUnmount(() => {
    for (let i = 0; i < callbackList.length; i++) {
      removeListener(callbackList[i]);
    }
  });

  return {
    send,
    addListener,
    removeListener
  };
}
