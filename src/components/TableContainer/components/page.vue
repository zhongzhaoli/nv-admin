<template>
  <div class="tableContainerPageComponent">
    <el-pagination
      v-model="page"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { PageComponentProps } from '../types';
import { ref, watch } from 'vue';

const page = ref<number>(1);

const props = defineProps<PageComponentProps>();
const emits = defineEmits(['currentChange']);

watch(
  () => props.currentPage,
  () => {
    page.value = props.currentPage;
  },
  {
    immediate: true
  }
);

const handleCurrentChange = (v: number) => {
  emits('currentChange', v);
};
</script>
<style lang="scss" scoped>
.tableContainerPageComponent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
