<template>
  <a-dropdown trigger="hover">
    <div class="navbarFunItem">
      <i class="ri-translate" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">中文</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">English</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
