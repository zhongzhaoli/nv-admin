import { ResponseJson } from '@/config/request';
import { request } from '@/utils/request';

export function getUserInfo(): Promise<ResponseJson> {
  return request({
    url: '/user/userInfo',
    method: 'get'
  });
}
