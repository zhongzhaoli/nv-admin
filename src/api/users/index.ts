import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface UsersListParams {
  page: number;
  pageSize?: number;
  username?: string;
  status?: number;
  deptId?: string;
}

export interface UsersDto {
  deptId: string | number;
  username: string;
  avatar: string;
  phone: string;
  realName: string;
}

export function getUsersList(
  params: UsersListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/system/users',
    method: 'get',
    params
  });
}

export function createUsers(data: UsersDto): Promise<ResponseJson> {
  return request({
    url: '/system/users',
    method: 'post',
    data
  });
}

export function updateUsers<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/system/users/${id}`,
    method: 'put',
    data
  });
}

export function deleteUsers(id: string): Promise<ResponseJson> {
  return request({
    url: `/system/users/${id}`,
    method: 'delete'
  });
}
