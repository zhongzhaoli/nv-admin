// 请求路径
export const baseURL = import.meta.env.VITE_API_URL;
// 超时事件
export const requestTimeout = 5000;
// 请求格式
export const contentType = 'application/json;charset=UTF-8';

// 返回code
export enum ResponseCode {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401
}
// 返回信息格式
export interface ResponseJson<T = string> {
  code: ResponseCode;
  msg: string;
  data?: T;
}
