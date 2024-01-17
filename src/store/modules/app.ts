import { defineStore } from 'pinia';
import { ELEMENT_UI_SIZE, SIDEBAR_OPENED, TABLE_SIZE } from '@/constants/app';
import { piniaPersistConfig } from '@/utils/persist';
import { ref } from 'vue';

interface AppState {
  sidebarOpened: boolean;
  tableSize: ELEMENT_UI_SIZE;
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

    // Table Size
    const tableSize = ref<ELEMENT_UI_SIZE>(TABLE_SIZE);
    const setTableSize = (size: ELEMENT_UI_SIZE) => {
      tableSize.value = size;
    };

    return {
      sidebarOpened,
      tableSize,
      setTableSize,
      toggleSidebarCollapsed
    };
  },
  {
    persist: piniaPersistConfig<AppStateKey>('APP_STORE', [
      'sidebarOpened',
      'tableSize'
    ])
  }
);
