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
import { computed, ref, onMounted } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useRouterStore } from '@/store/modules/router';
import { useRouter } from 'vue-router';
import { useRouteListener } from '@/hooks/useRouteListener';

const appStore = useAppStore();
const routerStore = useRouterStore();
const router = useRouter();
const { addRouteListener } = useRouteListener();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 是否折叠Sidebar
const isCollapse = computed(() => !appStore.sidebarOpened);
// 处理后的路由数据
const handledRoutes = computed(() => routerStore.handledRoutes);

// 点击页面跳转
const handleClick = (v: { key: string }) => {
  router.push(v.key);
};

onMounted(() => {
  addRouteListener((route) => {
    const pathStringArr = route.matched.map((v) => v.path);
    selectedKeys.value = pathStringArr;
    openKeys.value = isCollapse.value ? [] : pathStringArr;
  }, true);
});
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
