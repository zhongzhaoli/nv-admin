<template>
  <div class="tableContainerPageComponent">
    <el-pagination
      v-model="page"
      :total="total"
      layout="total, prev, pager, next"
    />
  </div>
</template>
<script setup lang="ts">
import { PageComponentProps } from '../types';
import { ref, watch } from 'vue';

const page = ref(1);

const props = defineProps<PageComponentProps>();

watch(
  () => props.currentPage,
  () => {
    page.value = props.currentPage;
  },
  {
    immediate: true
  }
);
</script>
<style lang="scss" scoped>
.tableContainerPageComponent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
