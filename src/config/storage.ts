import { StorageEnum } from '@/constants/storage';

/** 持久化采用LocalStorage机制 */
export const STORAGE_TYPE: StorageEnum = StorageEnum.LOCAL;

/** 持久化行为 */
export const STORAGE_ACTION: Storage =
  STORAGE_TYPE === StorageEnum.LOCAL
    ? window.localStorage
    : window.sessionStorage;

/** 持久化KEY */
export enum STORAGE_KEY {
  'user' = 'USER_STORE',
  'app' = 'APP_STORE'
}
