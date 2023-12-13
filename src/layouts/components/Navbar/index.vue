<template>
  <a-flex class="navbarContainer" justify="space-between">
    <a-flex class="leftBox" align="center">
      <Hamburger />
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
    </a-flex>
    <a-flex class="rightBox" align="center" justify="flex-end">
      <Search />
      <Language />
      <Fullscreen />
      <Notification />
      <UserDropdown />
    </a-flex>
  </a-flex>
</template>
<script setup lang="ts">
import Hamburger from './components/Hamburger/index.vue';
import Breadcrumb from './components/Breadcrumb/index.vue';
import UserDropdown from './components/UserDropdown/index.vue';
import Notification from './components/Notification/index.vue';
import Fullscreen from './components/Fullscreen/index.vue';
import Language from './components/Language/index.vue';
import Search from './components/Search/index.vue';
</script>
<style lang="scss" scoped>
.navbarContainer {
  height: 100%;
  background-color: var(--navbar-background-color);
  padding: var(--navbar-padding);
  box-sizing: border-box;
  & > .leftBox {
    & > .breadcrumb {
      margin-left: 10px;
    }
  }
}
</style>
