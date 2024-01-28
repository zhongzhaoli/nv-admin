export enum ResponseCode {
  SUCCESS = 0,
  ERROR = 1,
  UNAUTHORIZED = 401
}

export interface ResponseJson<T = any> {
  code: ResponseCode;
  msg: string;
  data: T;
}

export interface ResponsePageJson<T = any> {
  code: ResponseCode;
  msg: string;
  data: T;
}

export interface PageListJson<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
