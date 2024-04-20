import { defineStore } from 'pinia';
import {
  DEFAULT_LANGUAGE,
  ELEMENT_UI_SIZE,
  LANGUAGE,
  SIDEBAR_OPENED,
  TABLE_SIZE
} from '@/constants/app';
import { piniaPersistConfig } from '@/utils/persist';
import { ref } from 'vue';
import { STORAGE_KEY } from '@/config/storage';

interface AppState {
  sidebarOpened: boolean;
  tableSize: ELEMENT_UI_SIZE;
  language: string;
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
    // 语言
    const language = ref<LANGUAGE>(DEFAULT_LANGUAGE);
    const setLanguage = (val: LANGUAGE) => {
      language.value = val;
    };

    // Table Size
    const tableSize = ref<ELEMENT_UI_SIZE>(TABLE_SIZE);
    const setTableSize = (size: ELEMENT_UI_SIZE) => {
      tableSize.value = size;
    };

    return {
      sidebarOpened,
      tableSize,
      language,
      setTableSize,
      setLanguage,
      toggleSidebarCollapsed
    };
  },
  {
    persist: piniaPersistConfig<AppStateKey>(STORAGE_KEY.app, [
      'sidebarOpened',
      'tableSize',
      'language'
    ])
  }
);
