<template>
  <el-dropdown trigger="hover" @command="handleCommand">
    <div class="navbarFunItem">
      <el-avatar :size="26" v-if="userInfo" :src="userInfo.avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="updatePassword">
          {{ $t('msg.navbar.userDropdown.updatePassword') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          {{ $t('msg.navbar.userDropdown.logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <ChangePassword ref="changePasswrd" />
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import ChangePassword, {
  type ChangePasswordInstance
} from './components/changePassword.vue';
import { ref, computed } from 'vue';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const changePasswrd = ref<ChangePasswordInstance | null>(null);

const handleCommand = (command: string | number | object) => {
  if (command === 'logout') logout();
  if (command === 'updatePassword')
    if (changePasswrd.value) changePasswrd.value.openDialog();
};

const logout = () => {
  userStore.logout();
  window.location.reload();
};
</script>
<style lang="scss" scoped></style>
