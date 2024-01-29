<template>
  <div class="layoutContainer">
    <Sidebar class="sidebar" />
    <div class="right" :class="{ opened: appStore.sidebarOpened }">
      <div class="navbar">
        <Navbar />
      </div>
      <div class="tagsView">
        <TagsView />
      </div>
      <div class="appMain">
        <AppMain />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue';
import Navbar from './components/Navbar/index.vue';
import AppMain from './components/AppMain/index.vue';
import TagsView from './components/TagsView/index.vue';
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();
</script>
<style lang="scss" scoped>
.layoutContainer {
  display: flex;
  height: 100vh;
  background-color: var(--layout-background-color);
  & > .sidebar {
    width: var(--sidebar-width);
  }
  & > .right {
    transition: width var(--normal-transition-duration);
    width: calc(100% - var(--sidebar-closed-width));
    &.opened {
      width: calc(100% - var(--sidebar-width));
    }
    & > .navbar {
      width: 100%;
      height: var(--navbar-height);
    }
    & > .tagsView {
      width: 100%;
      height: var(--tagsView-height);
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.08);
      position: relative;
      z-index: 9;
    }
    & > .appMain {
      width: 100%;
      height: calc(100vh - var(--navbar-height) - var(--tagsView-height));
      overflow: auto;
    }
  }
}
</style>
