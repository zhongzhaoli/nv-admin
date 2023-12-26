<template>
  <el-dropdown trigger="hover" @command="handleCommand">
    <div class="navbarFunItem">
      <el-avatar :size="26" :src="userStore.userInfo?.avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile"> Profile </el-dropdown-item>
        <el-dropdown-item command="logout"> Logout </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const router = useRouter();

const handleCommand = (command: string | number | object) => {
  if (command === 'logout') logout();
};

const logout = () => {
  userStore.logout();
  router.push('/login');
};
</script>
<style lang="scss" scoped></style>
