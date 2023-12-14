import { piniaPersistConfig } from '@/utils/persist';
import { ref } from 'vue';
import { defineStore } from 'pinia';

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  avatar: string;
}

interface UserState {
  token: string;
  userInfo: UserInfo;
}

type UserStateKey = Array<keyof UserState>;

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref<string>('admin');
    // 用户信息
    const userInfo = ref<UserInfo>();

    // 设置用户信息
    const setUserInfo = (val: UserInfo) => {
      userInfo.value = val;
    };
    return { token, userInfo, setUserInfo };
  },
  {
    persist: piniaPersistConfig<UserStateKey>('USER_STORE', ['token'])
  }
);
