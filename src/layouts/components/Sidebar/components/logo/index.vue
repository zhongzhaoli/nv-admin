<template>
  <a-flex :class="{ collapse, logoBox: true }" align="center" justify="center">
    <transition name="layout-logo-fade">
      <router-link to="/" v-if="collapse">
        <img class="smallLogo" :src="smallLogo" />
      </router-link>
      <router-link to="/" v-else>
        <img class="logo" :src="logo" />
      </router-link>
    </transition>
  </a-flex>
</template>
<script setup lang="ts">
import logo from '@/assets/logo.png';
import smallLogo from '@/assets/logo_small.png';
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});
</script>
<style lang="scss" scoped>
.logoBox {
  width: 100%;
  height: var(--logo-height);
  text-align: center;
  & img {
    vertical-align: bottom;
  }
  & .smallLogo {
    width: calc(var(--sidebar-closed-width) - 30px);
    display: none;
  }
  & .logo {
    width: calc(var(--sidebar-width) - 80px);
  }
  &.collapse {
    & .smallLogo {
      display: inline-block;
    }
    & .logo {
      display: none;
    }
  }
}
</style>
