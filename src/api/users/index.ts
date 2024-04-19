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

export function getUsersListExcludeMine(
  params: UsersListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/system/users/excludeMine',
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

export function usersSetRoles(
  id: number | string,
  data: {
    roleId: string | number;
  }
): Promise<ResponseJson> {
  return request({
    url: `/system/users/${id}/setRole`,
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
    method: 'patch',
    data
  });
}

export function changeUsersStatus(
  id: string | number,
  data: { status: any }
): Promise<ResponseJson> {
  return request({
    url: `/system/users/${id}/changeStatus`,
    method: 'patch',
    data
  });
}

export function deleteUsers(id: string): Promise<ResponseJson> {
  return request({
    url: `/system/users/${id}`,
    method: 'delete'
  });
}
