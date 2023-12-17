<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="index === breadcrumbs.length - 1">{{ item.meta.title }}</span>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { useRouteListener } from '@/hooks/useRouteListener';
import { RouteLocationMatched, useRoute } from 'vue-router';
import { ref } from 'vue';
const { addRouteListener } = useRouteListener();

const breadcrumbs = ref<RouteLocationMatched[]>([]);

const route = useRoute();
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};

addRouteListener(() => {
  getBreadcrumb();
}, true);
</script>
<style scoped></style>
