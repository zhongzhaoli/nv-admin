import { ResponseJson } from '@/config/request';
import { request } from '@/utils/request';

export function getRoutes<T>(): Promise<ResponseJson<T>> {
  return request({
    url: '/user/routes',
    method: 'get'
  });
}
