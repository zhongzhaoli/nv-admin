<template>
  <router-view>
    <template #default="{ Component, route }">
      <keep-alive :include="tagsViewStore.cachedViews">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </template>
  </router-view>
</template>
<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView';
const tagsViewStore = useTagsViewStore();
</script>
<style scoped></style>
