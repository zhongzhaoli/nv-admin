<template>
  <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
    <template #icon>
      <i :class="item?.meta?.icon || ''" />
    </template>
    <template #title>
      <span>{{ item?.meta?.title || '' }}</span>
    </template>
    <SidebarItem
      v-for="child in item.children"
      :item="child"
      :isTop="false"
      :key="child.path"
    />
  </a-sub-menu>
  <a-menu-item v-else :key="item.path">
    <template #icon v-if="isTop">
      <i :class="item?.meta?.icon || ''" />
    </template>
    <span>{{ item?.meta?.title || '' }}</span>
  </a-menu-item>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

interface Props {
  item: RouteRecordRaw;
  isTop: boolean;
}

defineProps<Props>();
</script>
<style scoped></style>
