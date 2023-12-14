<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <div class="right">
      <div class="navbar">
        <Navbar />
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
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: var(--layout-background-color);
  & > .sidebar {
    width: var(--sidebar-width);
  }
  & > .right {
    flex: 1;
    & > .navbar {
      width: 100%;
      height: var(--navbar-height);
    }
    & > .appMain {
      width: 100%;
      height: calc(100vh - var(--navbar-height));
      padding: var(--appMain-outside-padding);
      overflow: auto;
    }
  }
}
</style>
