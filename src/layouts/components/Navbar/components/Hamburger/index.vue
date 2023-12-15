<template>
  <div class="navbarFunItem" @click="toggleCollapse">
    <i class="ri-menu-fold-line" v-if="appStore.sidebarOpened" />
    <i class="ri-menu-unfold-line" v-else />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();
// 切换侧边栏打开状态
const toggleCollapse = () => {
  appStore.toggleSidebarCollapsed();
};
</script>
<style lang="scss" scoped></style>
