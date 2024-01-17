import { uniq, sortBy } from 'lodash-es';

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED: boolean = true;
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED: boolean = false;

/** Element Size */
export type ELEMENT_UI_SIZE = 'large' | 'small' | 'default';
/** Table Size */
export const TABLE_SIZE: ELEMENT_UI_SIZE = 'large';
/** Table Size 列表 */
export const TABLE_SIZE_LIST: { key: ELEMENT_UI_SIZE; label: string }[] = [
  {
    key: 'small',
    label: '紧凑'
  },
  {
    key: 'default',
    label: '普通'
  },
  {
    key: 'large',
    label: '宽松'
  }
];

/** Pagination Layout */
export const PAGINATION_LAYOUT: string =
  'total, prev, pager, next, sizes, jumper';
// Pagination 默认页码
export const PAGE_SIZE: number = 6;
// Pagination 默认页数
export const PAGE: number = 1;
// Pagination 页码列表
export const PAGE_SIZES: number[] = sortBy(uniq([PAGE_SIZE, 6, 10, 20, 50]));
