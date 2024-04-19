import { request } from '@/utils/request';

export function getUserInfo() {
  return request({
    url: '/user/userInfo',
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
    url: '/user/changePassword',
    method: 'post',
    data
  });
}
