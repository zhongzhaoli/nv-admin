<template>
  <div class="sidebarContainer" :class="{ hideSidebar: isCollapse }">
    <Logo :collapse="isCollapse" />
    <div class="menuBox">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 100%"
        mode="inline"
        :inline-collapsed="isCollapse"
        @click="handleClick"
      >
        <SidebarItem
          v-for="child in handledRoutes"
          :item="child"
          :isTop="true"
          :key="child.path"
        />
      </a-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './components/logo/index.vue';
import SidebarItem from './SidebarItem.vue';
import { ref, computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useRouterStore } from '@/store/modules/router';
import { useRouter, useRoute } from 'vue-router';

const appStore = useAppStore();
const routerStore = useRouterStore();
const router = useRouter();
const route = useRoute();

// 页面刷新时，根据当前路由设置选中的菜单项
const routeMatched = computed(() => {
  return route.matched.map((v) => v.path);
});

// 是否折叠Sidebar
const isCollapse = computed(() => !appStore.sidebarOpened);
// 处理后的路由数据
const handledRoutes = computed(() => routerStore.handledRoutes);

const selectedKeys = ref<string[]>(routeMatched.value);
const openKeys = ref<string[]>(isCollapse.value ? [] : routeMatched.value);

const handleClick = (v: { key: string }) => {
  router.push(v.key);
};
</script>
<style lang="scss" scoped>
.sidebarContainer {
  border-right: 1px solid var(--normal-border-color);
  background-color: var(--sidebar-background-color);
  box-sizing: border-box;
  transition-duration: 0.3s;
  &.hideSidebar {
    width: var(--sidebar-closed-width) !important;
  }
  & > .menuBox {
    height: calc(100vh - var(--navbar-height));
    overflow: auto;
  }
}
</style>
