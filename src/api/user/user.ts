import { request } from '@/utils/request';

export function getUserInfo() {
  return request({
    url: '/userInfo',
    method: 'get'
  });
}

export interface PasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export function changePassword(data: PasswordDto) {
  return request({
    url: '/changePassword',
    method: 'post',
    data
  });
}
