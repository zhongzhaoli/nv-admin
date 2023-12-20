<template>
  <div class="sidebarContainer" :class="{ hideSidebar: isCollapse }">
    <Logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        style="width: 100%"
        :default-active="defaultActive"
        mode="vertical"
        :unique-opened="true"
        :collapse-transition="false"
        :collapse="isCollapse"
        router
      >
        <SidebarItem
          v-for="child in handledRoutes"
          :item="child"
          :isTop="true"
          :key="child.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import Logo from './components/logo/index.vue';
import SidebarItem from './SidebarItem.vue';
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useRouterStore } from '@/store/modules/router';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const routerStore = useRouterStore();
const route = useRoute();

// 默认选中的菜单
const defaultActive = computed(() => {
  return route.path;
});

// 是否折叠Sidebar
const isCollapse = computed(() => !appStore.sidebarOpened);
// 处理后的路由数据
const handledRoutes = computed(() => routerStore.handledRoutes);
</script>
<style lang="scss" scoped>
.sidebarContainer {
  border-right: 1px solid var(--normal-border-color);
  background-color: var(--sidebar-background-color);
  box-sizing: border-box;
  transition-duration: var(--normal-transition-duration);
  &.hideSidebar {
    width: var(--sidebar-closed-width) !important;
  }
}

.el-scrollbar {
  height: calc(100vh - var(--logo-height));
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
</style>
