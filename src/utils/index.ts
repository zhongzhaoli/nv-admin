import { flatMapDeep } from 'lodash-es';

// 取出字串中的数字
export const extractNumber = (str: string): number => {
  const match = str.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

// 打平嵌套数组对象
export const flattenNestedArray = <T>(
  array: any[],
  childrenKey: string
): T[] => {
  return flatMapDeep(array, (item: any) => [
    item,
    ...(item[childrenKey]
      ? flattenNestedArray(item[childrenKey], childrenKey)
      : [])
  ]);
};
