import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface UsersListParams {
  page: number;
  pageSize?: number;
  username?: string;
  status?: number;
}

export interface UsersDto {
  username: string;
  avatar: string;
  phone: string;
  realName: string;
}

export function getUsersList(
  params: UsersListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/users',
    method: 'get',
    params
  });
}

export function createUsers(data: UsersDto): Promise<ResponseJson> {
  return request({
    url: '/users',
    method: 'post',
    data
  });
}

export function updateUsers<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  });
}
