import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface DeptDto {
  name: string;
  description: string;
}

export interface DeptListParams {
  page: number;
  pageSize?: number;
  name?: string;
  status?: number;
}

export function getDeptList(params: DeptListParams): Promise<ResponsePageJson> {
  return request({
    url: '/system/department',
    method: 'get',
    params
  });
}

export function createDept(data: DeptDto): Promise<ResponseJson> {
  return request({
    url: '/system/department',
    method: 'post',
    data
  });
}

export function updateDept<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/system/department/${id}`,
    method: 'put',
    data
  });
}

export function deleteDept(id: string): Promise<ResponseJson> {
  return request({
    url: `/system/department/${id}`,
    method: 'delete'
  });
}
