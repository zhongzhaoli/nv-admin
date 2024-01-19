import { request } from '@/utils/request';

import { ResponsePageJson } from '@/config/request';

export interface UsersListParams {
  page: number;
  pageSize?: number;
  username?: string;
  status?: number;
}

export function getUsersList(
  params: UsersListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/user/getList',
    method: 'get',
    params
  });
}
