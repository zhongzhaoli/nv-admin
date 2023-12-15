<template>
  <template v-if="item.children && item.children.length">
    <a-sub-menu :key="item.path">
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
  </template>
  <template v-else>
    <a-menu-item :key="item.path">
      <template #icon v-if="isTop">
        <i :class="item?.meta?.icon || ''" />
      </template>
      <span>{{ item?.meta?.title || '' }}</span>
    </a-menu-item>
  </template>
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
