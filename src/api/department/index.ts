import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface DeptDto {
  name: string;
  description: string;
}

export interface DeptMemberDto {
  ids: number[];
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

export function getDeptMemberList<T>(
  id: number | string
): Promise<ResponseJson<T>> {
  return request({
    url: `system/department/${id}/memberList`,
    method: 'get'
  });
}

export function deleteDeptMember(
  id: number | string,
  mid: number | string
): Promise<ResponseJson> {
  return request({
    url: `system/department/${id}/memberList/${mid}`,
    method: 'delete'
  });
}

export function addDeptMember(data: DeptMemberDto): Promise<ResponseJson> {
  return request({
    url: `system/department/memberList`,
    method: 'post',
    data
  });
}

export function getAllDeptList<T>(): Promise<ResponseJson<T>> {
  return request({
    url: '/system/department/list',
    method: 'get'
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
    method: 'patch',
    data
  });
}

export function changeDeptStatus(
  id: string | number,
  data: { status: any }
): Promise<ResponseJson> {
  return request({
    url: `/system/department/${id}/changeStatus`,
    method: 'patch',
    data
  });
}

export function deleteDept(id: string): Promise<ResponseJson> {
  return request({
    url: `/system/department/${id}`,
    method: 'delete'
  });
}
