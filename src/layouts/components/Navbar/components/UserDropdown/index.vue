<template>
  <a-dropdown trigger="hover">
    <div class="navbarFunItem">
      <a-avatar :size="26" src="/src/assets/logo_small.png" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">Profile</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">Logout</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
