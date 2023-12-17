<template>
  <div class="navbarContainer">
    <div class="leftBox">
      <Hamburger />
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
    </div>
    <div class="rightBox">
      <Search />
      <Language />
      <Screenfull />
      <Notification />
      <UserDropdown />
    </div>
  </div>
</template>
<script setup lang="ts">
import Hamburger from './components/Hamburger/index.vue';
import Breadcrumb from './components/Breadcrumb/index.vue';
import UserDropdown from './components/UserDropdown/index.vue';
import Notification from './components/Notification/index.vue';
import Screenfull from './components/Screenfull/index.vue';
import Language from './components/Language/index.vue';
import Search from './components/Search/index.vue';
</script>
<style lang="scss" scoped>
.navbarContainer {
  height: 100%;
  background-color: var(--navbar-background-color);
  padding: var(--navbar-padding);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .leftBox {
    display: flex;
    align-items: center;
    & > .breadcrumb {
      margin-left: 10px;
    }
  }
  & > .rightBox {
    display: flex;
    align-items: center;
  }
}
</style>
