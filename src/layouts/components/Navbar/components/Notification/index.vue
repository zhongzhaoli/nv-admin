<template>
  <el-tooltip :content="$t('msg.navbar.notification.tooltip')">
    <div class="navbarFunItem" @click="toUrl">
      <i class="ri-notification-4-line" />
    </div>
  </el-tooltip>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const toUrl = () => {
  router.push('/notification');
};
</script>
<style lang="scss" scoped></style>
