<template>
  <el-dropdown trigger="hover">
    <div class="navbarFunItem">
      <el-avatar :size="26" src="/src/assets/logo_small.png" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item> Profile </el-dropdown-item>
        <el-dropdown-item> Logout </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
