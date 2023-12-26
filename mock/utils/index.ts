import { resolve } from 'path-browserify';
import { MockMethod } from 'vite-plugin-mock';

// 路径添加前缀
export const pathPrefix = (
  prefix: string,
  list: Array<MockMethod>
): Array<MockMethod> => {
  list.forEach((item) => {
    if (typeof item.url !== 'string')
      throw new Error('mock url must be string');
    if (item.url.startsWith('/')) item.url = item.url.slice(1);
    item.url = resolve(prefix, item.url);
  });
  return list;
};
