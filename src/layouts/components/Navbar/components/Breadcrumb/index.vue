<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route);
</script>
<style scoped></style>
