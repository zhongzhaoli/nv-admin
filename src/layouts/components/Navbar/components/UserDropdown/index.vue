<template>
  <el-dropdown trigger="hover">
    <div class="navbarFunItem">
      <el-avatar :size="26" :src="userStore.userInfo?.avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item> Profile </el-dropdown-item>
        <el-dropdown-item> Logout </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
</script>
<style lang="scss" scoped></style>
