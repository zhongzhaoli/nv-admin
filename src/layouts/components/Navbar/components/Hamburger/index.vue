<template>
  <div class="navbarFunItem" @click="toggleCollapse">
    <i class="ri-menu-fold-line" v-if="isOpened" />
    <i class="ri-menu-unfold-line" v-else />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
const appStore = useAppStore();
// 侧边栏是否打开
const isOpened = computed(() => appStore.sidebarOpened);
// 切换侧边栏打开状态
const toggleCollapse = () => {
  appStore.toggleSidebarCollapsed();
};
</script>
<style lang="scss" scoped></style>
