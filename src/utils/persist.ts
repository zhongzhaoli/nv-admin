import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';
import { STORAGE_ACTION } from '@/config/storage';
/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
export const piniaPersistConfig = <T extends string[]>(
  key: string,
  paths?: T
) => {
  const persist: PersistedStateOptions = {
    key,
    storage: STORAGE_ACTION,
    paths
  };
  return persist;
};
