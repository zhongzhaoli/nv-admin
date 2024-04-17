import { request } from '@/utils/request';

import { ResponseJson } from '@/config/request';

export interface todoListDto {
  title: string;
  active?: boolean;
  endTime?: string;
}

export function getTodoList<T>(): Promise<ResponseJson<T>> {
  return request({
    url: '/todoList',
    method: 'get'
  });
}

export function createTodo(data: todoListDto): Promise<ResponseJson> {
  return request({
    url: '/todoList',
    method: 'post',
    data
  });
}

export function updateTodo<T>(
  id: string | number,
  data: Partial<T>
): Promise<ResponseJson> {
  return request({
    url: `/todoList/${id}`,
    method: 'patch',
    data
  });
}

export function deleteTodo(id: number | string): Promise<ResponseJson> {
  return request({
    url: `/todoList/${id}`,
    method: 'delete'
  });
}
