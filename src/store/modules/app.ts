import { defineStore } from 'pinia';
import { SIDEBAR_OPENED } from '@/constants/app';
import { piniaPersistConfig } from '@/utils/persist';
import { ref } from 'vue';

interface AppState {
  sidebarOpened: boolean;
}

type AppStateKey = Array<keyof AppState>;

export const useAppStore = defineStore(
  'app',
  () => {
    // 侧边栏是否展开
    const sidebarOpened = ref<boolean>(SIDEBAR_OPENED);
    // 侧边栏状态切换
    const toggleSidebarCollapsed = () => {
      sidebarOpened.value = !sidebarOpened.value;
    };

    return {
      sidebarOpened,
      toggleSidebarCollapsed
    };
  },
  {
    persist: piniaPersistConfig<AppStateKey>('APP_STORE', ['sidebarOpened'])
  }
);
