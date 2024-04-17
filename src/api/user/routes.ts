import { request } from '@/utils/request';

export function getRoutes() {
  return request({
    url: '/user/routes',
    method: 'get'
  });
}
