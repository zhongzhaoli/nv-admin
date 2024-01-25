<template>
  <el-tooltip :content="$t('msg.navbar.search.tooltip')">
    <div class="navbarFunItem" @click="openDialog">
      <i class="ri-menu-search-line" />
    </div>
  </el-tooltip>
  <Dialog :dialogVisible="dialogVisible" @close="closeDialog" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Dialog from './dialog.vue';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped></style>
