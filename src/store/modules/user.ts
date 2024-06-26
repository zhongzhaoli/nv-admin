import { piniaPersistConfig } from '@/utils/persist';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { LoginDto, login as loginApi } from '@/api/user/login';
import { getUserInfo as getUserInfoApi } from '@/api/user/user';
import { ResponseJson } from '@/config/request';
import { TOKEN_KEY } from '@/constants/storage';
import { STORAGE_KEY } from '@/config/storage';

interface UserDepartment {
  name: string;
  description: string;
  avatar: string;
}

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  realname: string;
  avatar: string;
  department: UserDepartment;
  memberCount: number;
  memberAvatarList: string[];
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
    const token = ref<string>();
    // 用户信息
    const userInfo = ref<UserInfo>();

    // 设置用户信息
    const setUserInfo = (val: UserInfo) => {
      userInfo.value = val;
    };
    //登录
    const login = async (payload: LoginDto) => {
      const data = (await loginApi(payload)) as ResponseJson<{ token: string }>;
      token.value = data.data.token;
      return data;
    };
    // 退出登录
    const logout = () => {
      const userStore = localStorage.getItem(STORAGE_KEY.user) as any;
      if (userStore) {
        delete userStore.token;
        token.value = undefined;
        localStorage.setItem(STORAGE_KEY.user, userStore);
      }
    };
    // 获取用户信息
    const getUserInfo = async () => {
      const data = (await getUserInfoApi()) as ResponseJson<UserInfo>;
      setUserInfo(data.data as UserInfo);
      return data;
    };
    return { token, userInfo, setUserInfo, logout, login, getUserInfo };
  },
  {
    persist: piniaPersistConfig<UserStateKey>(STORAGE_KEY.user, [TOKEN_KEY])
  }
);
