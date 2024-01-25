import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';

export interface NotificationDto {
  name: string;
  description: string;
}

export interface NotificationListParams {
  page: number;
  pageSize?: number;
}

export function getNotificationList(
  params: NotificationListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/notification',
    method: 'get',
    params
  });
}

export function getNotificationDetail(
  id: number | string
): Promise<ResponseJson> {
  return request({
    url: `/notification/${id}`,
    method: 'get'
  });
}

export function createNotification(
  data: NotificationDto
): Promise<ResponseJson> {
  return request({
    url: '/notification',
    method: 'post',
    data
  });
}
