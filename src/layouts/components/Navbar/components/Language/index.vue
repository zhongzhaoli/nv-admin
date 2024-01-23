<template>
  <el-dropdown trigger="hover" @command="handle">
    <div class="navbarFunItem">
      <i class="ri-translate" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'">
          中文
        </el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language === 'en'">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { LANGUAGE } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

const appStore = useAppStore();

const language = computed(() => appStore.language);

const handle = (val: LANGUAGE) => {
  appStore.setLanguage(val);
  location.reload();
};
</script>
<style lang="scss" scoped></style>
