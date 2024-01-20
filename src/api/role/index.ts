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
    url: '/role',
    method: 'get',
    params
  });
}

export function createRole(data: RoleDto): Promise<ResponseJson> {
  return request({
    url: '/role',
    method: 'post',
    data
  });
}

export function updateRole<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  });
}

export function deleteRole(id: string): Promise<ResponseJson> {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  });
}
