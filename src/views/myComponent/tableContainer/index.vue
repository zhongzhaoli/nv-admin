<template>
  <div class="container">
    <h2>Table</h2>
    <Table />
    <h2 class="mt">Table - Tree</h2>
    <TableTree />
    <h2 class="mt">Table - Container</h2>
    <TableContainer />
  </div>
</template>
<script setup lang="ts">
import TableContainer from './TableContainer/index.vue';
import TableTree from './TableTree/index.vue';
import Table from './Table/index.vue';
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  & > h2 {
    padding: 0;
    margin-top: 0;
    margin-bottom: var(--normal-padding);
  }
  & > h2.mt {
    margin-top: var(--normal-padding);
  }
}
</style>
