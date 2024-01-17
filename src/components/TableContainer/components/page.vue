<template>
  <div class="tableContainerPageComponent">
    <el-pagination
      v-model="page"
      :page-size="pageSize"
      :total="total"
      :page-sizes="PAGE_SIZES"
      :layout="PAGINATION_LAYOUT"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange"
    />
  </div>
</template>
<script setup lang="ts">
import { PageComponentProps } from '../types';
import { PAGE, PAGINATION_LAYOUT, PAGE_SIZES } from '@/constants/app';
import { ref, watch } from 'vue';

const page = ref<number>(PAGE);

const props = defineProps<PageComponentProps>();
const emits = defineEmits(['currentChange', 'pageSizeChange']);

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

const handlePageSizeChange = (v: number) => {
  emits('pageSizeChange', v);
};
</script>
<style lang="scss" scoped>
.tableContainerPageComponent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
