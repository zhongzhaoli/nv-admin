import mitt, { type Handler } from 'mitt';

const emitter = mitt();
const key = Symbol('TODOLIST_CHANGE');

export type Prop<T> = T;

// 发送信息
const dataChange = <T>(prop: Prop<T>) => {
  emitter.emit(key, prop);
};

// 接收信息
const addListener = <T>(callback: (prop: Prop<T>) => void) => {
  emitter.on(key, callback as Handler);
};

export default {
  dataChange,
  addListener
};
