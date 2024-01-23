<template>
  <el-config-provider :locale="appStore.language === 'zh' ? zhCn : en">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
const appStore = useAppStore();
</script>
<style scoped lang="scss"></style>
