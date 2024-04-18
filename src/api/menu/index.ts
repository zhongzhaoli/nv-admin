import { request } from '@/utils/request';
import { ResponseJson } from '@/config/request';
import { ROUTE_TYPE } from '@/constants/route';

export interface MenuListParams {
  name?: string;
  path?: string;
  status?: number;
}

interface MenuDto {
  pid: number;
  type: ROUTE_TYPE;
  icon: string;
  path: string;
  title: string;
  name: string;
  component: string;
  sort: number;
  hidden: boolean;
  keepAlive: boolean;
  affix: boolean;
}

export function getMenuList<T>(
  params?: MenuListParams
): Promise<ResponseJson<T>> {
  return request({
    url: '/system/routes',
    method: 'get',
    params
  });
}

export function createMenu(data: MenuDto): Promise<ResponseJson> {
  return request({
    url: '/system/routes',
    method: 'post',
    data
  });
}

export function updateMenu<T>(
  id: string,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/system/routes/${id}`,
    method: 'patch',
    data
  });
}

export function deleteMenu(id: number | string): Promise<ResponseJson> {
  return request({
    url: `/system/routes/${id}`,
    method: 'delete'
  });
}
