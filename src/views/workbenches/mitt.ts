import mitt, { type Handler } from 'mitt';

const emitter = mitt();
const key = Symbol('WORKBENCHES_DATA_CHANGE');

export interface Prop {
  key: 'todoList' | 'project' | 'notification';
  value: number;
}

// 发送信息
const dataChange = (prop: Prop) => {
  emitter.emit(key, prop);
};

// 接收信息
const addListener = (callback: (prop: Prop) => void) => {
  emitter.on(key, callback as Handler);
};

export default {
  dataChange,
  addListener
};
