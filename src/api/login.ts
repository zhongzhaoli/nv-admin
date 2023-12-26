import { request } from '@/utils/request';

export interface LoginDto {
  username: string;
  password: string;
}

export function login(data: LoginDto) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}
