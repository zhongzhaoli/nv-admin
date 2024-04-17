import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface RoleDto {
  name: string;
  description: string;
}

export interface RoleListParams {
  page: number;
  pageSize?: number;
  username?: string;
  status?: number;
}

export function getRoleList(params: RoleListParams): Promise<ResponsePageJson> {
  return request({
    url: '/system/role',
    method: 'get',
    params
  });
}

export function roleSetPermission<T>(
  id: number | string,
  data: {
    routeIds: Array<string | number>;
  }
): Promise<ResponseJson<T>> {
  return request({
    url: `/system/role/${id}/editRoutes`,
    method: 'post',
    data
  });
}

export function roleGetPermission<T>(
  id: number | string
): Promise<ResponseJson<T>> {
  return request({
    url: `/system/role/${id}/routes`,
    method: 'get'
  });
}

export function createRole(data: RoleDto): Promise<ResponseJson> {
  return request({
    url: '/system/role',
    method: 'post',
    data
  });
}

export function updateRole<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/system/role/${id}`,
    method: 'put',
    data
  });
}

export function changeRoleStatus(
  id: string | number,
  data: { status: any }
): Promise<ResponseJson> {
  return request({
    url: `/system/role/${id}/changeStatus`,
    method: 'put',
    data
  });
}

export function deleteRole(id: string): Promise<ResponseJson> {
  return request({
    url: `/system/role/${id}`,
    method: 'delete'
  });
}
