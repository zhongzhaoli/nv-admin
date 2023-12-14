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
          v-for="child in sideBarRoutes"
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
import { ref, computed, watch } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useRouterStore } from '@/store/modules/router';
import { staticRoutes } from '@/router';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { removeHiddenMenus, onlyChildRoutes } from '@/utils/route';

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>(['1']);
const sideBarRoutes = ref<RouteRecordRaw[]>([]);

const appStore = useAppStore();
const routerStore = useRouterStore();
const router = useRouter();

// 是否折叠Sidebar
const isCollapse = computed(() => !appStore.sidebarOpened);
// 动态路由数据
const asyncRoutes = computed(() => routerStore.asyncRoutes);

if (asyncRoutes.value && asyncRoutes.value.length > 0) {
  // 静动态路由合并
  let routes: RouteRecordRaw[] = [...staticRoutes, ...asyncRoutes.value];
  // 删除hidden为true的路由
  routes = removeHiddenMenus(routes);
  // 处理children只有一个的跟路由 仅留下子路由
  routes = onlyChildRoutes(routes);
  sideBarRoutes.value = routes;
  console.log(routes);
}

const handleClick = (v: { key: string }) => {
  router.push(v.key);
};

watch(
  () => isCollapse.value,
  (val) => {
    if (val) {
      openKeys.value = [];
    } else {
      openKeys.value = ['sub1'];
    }
  },
  {
    immediate: true
  }
);
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
