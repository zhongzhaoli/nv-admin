import { request } from '@/utils/request';

import { ResponseJson, ResponsePageJson } from '@/config/request';
import { ACCESS_TYPE } from '@/constants/accessTarget';

export interface NotificationDto {
  title: string;
  content: string;
  whoType: ACCESS_TYPE;
  deptList: string[];
  userList: string[];
}

export interface NotificationListParams {
  page: number;
  pageSize?: number;
}

export function getNotificationList(
  params: NotificationListParams
): Promise<ResponsePageJson> {
  return request({
    url: '/article',
    method: 'get',
    params
  });
}

export function getNotificationDetail(
  id: number | string
): Promise<ResponseJson> {
  return request({
    url: `/article/${id}`,
    method: 'get'
  });
}

export function createNotification(
  data: NotificationDto
): Promise<ResponseJson> {
  return request({
    url: '/article',
    method: 'post',
    data
  });
}

export function delNotification(id: number | string) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  });
}
