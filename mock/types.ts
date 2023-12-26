export enum ResponseCode {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401
}

export interface ResponseJson<T = string> {
  code: ResponseCode;
  msg: string;
  data?: T;
}
