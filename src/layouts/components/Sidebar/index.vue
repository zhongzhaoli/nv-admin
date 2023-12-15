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
import { ref, computed, watch } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useRouterStore } from '@/store/modules/router';
import { useRouter } from 'vue-router';

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>(['1']);

const appStore = useAppStore();
const routerStore = useRouterStore();
const router = useRouter();

// 是否折叠Sidebar
const isCollapse = computed(() => !appStore.sidebarOpened);
// 处理后的路由数据
const handledRoutes = computed(() => routerStore.handledRoutes);

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
