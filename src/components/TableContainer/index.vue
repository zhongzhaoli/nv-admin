<template>
  <div class="tableContainerComponent">
    <!-- Handle -->
    <HandleComponent
      :leftButtons="(handle && handle.leftButtons) || []"
      @refresh="refresh"
      @left-button-click="handleLeftButtonClick"
    >
      <template #left>
        <slot name="handleLeft" />
      </template>
      <template #right>
        <slot name="handleRight" />
      </template>
    </HandleComponent>
    <!-- Table -->
    <TableComponent
      class="tableBox"
      :columns="table.columns"
      :data="table.data || []"
      :extra-columns="table.extraColumns || {}"
    >
      <template
        v-for="item in table.columns"
        :key="item.prop"
        #[item.prop]="scope"
      >
        <slot
          :name="`table-${item.prop}`"
          :row="scope.row"
          :index="scope.index"
        />
      </template>
    </TableComponent>
    <!-- Page -->
    <PageComponent
      v-if="page"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      class="pageBox"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import HandleComponent from './components/handle.vue';
import TableComponent from './components/table.vue';
import PageComponent from './components/page.vue';
import {
  HandleComponentProps,
  HandleLeftProps,
  TableComponentProps,
  PageComponentProps
} from './types';
interface ComponentProps {
  table: TableComponentProps;
  handle?: HandleComponentProps;
  page?: PageComponentProps;
}
defineProps<ComponentProps>();
const emits = defineEmits(['currentChange', 'refresh', 'handleLeftClick']);

// 刷新数据
const refresh = (key: string) => {
  emits('refresh', key);
};
// Handle 左侧按钮点击事件
const handleLeftButtonClick = (obj: {
  item: HandleLeftProps;
  index: number;
}) => {
  emits('handleLeftClick', obj);
};
// 分页页数变化
const handleCurrentChange = (v: number) => {
  emits('currentChange', v);
};
</script>
<style lang="scss" scoped>
.tableContainerComponent {
  & > .tableBox {
    margin-top: var(--normal-padding);
  }
  & > .pageBox {
    margin-top: var(--normal-padding);
  }
}
</style>
