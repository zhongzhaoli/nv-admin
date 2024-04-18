<template>
  <div class="tableContainerComponent">
    <!-- Handle -->
    <template v-if="handle && handle.show !== false">
      <HandleComponent
        class="handleBox"
        :leftButtons="(handle && handle.leftButtons) || []"
        :columns="newColumns"
        @refresh="refresh"
        @left-button-click="handleLeftButtonClick"
        @columns-change="handleColumnsChange"
      >
        <template #left>
          <slot name="handleLeft" />
        </template>
        <template #right>
          <slot name="handleRight" />
        </template>
      </HandleComponent>
    </template>
    <!-- Table -->
    <TableComponent
      class="tableBox"
      :columns="newColumns"
      :data="table.data || []"
      :extra-columns="table.extraColumns || {}"
      :extra-config="table.extraConfig || {}"
      @selection-change="handleSelectionChange"
    >
      <template
        v-for="item in newColumns"
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
      @page-size-change="handlePageSizeChange"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import HandleComponent from './components/handle.vue';
import TableComponent from './components/table.vue';
import PageComponent from './components/page.vue';
import {
  HandleComponentProps,
  HandleLeftProps,
  TableComponentProps,
  PageComponentProps,
  TableColumnsProps
} from './types';
import { mergeWith } from 'lodash-es';
interface ComponentProps {
  table: TableComponentProps;
  handle?: HandleComponentProps;
  page?: PageComponentProps;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits([
  'currentChange',
  'refresh',
  'handleLeftClick',
  'pageChange',
  'selectionChange'
]);

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
const pageData = reactive({
  page: props.page?.currentPage,
  pageSize: props.page?.pageSize
});

// 分页事件合并
// 分页页数变化
const handleCurrentChange = (v: number) => {
  pageData.page = v;
  emits('pageChange', pageData);
};
// 分页页码变化
const handlePageSizeChange = (v: number) => {
  pageData.pageSize = v;
  emits('pageChange', pageData);
};

// 字段设置
const newColumns = ref<TableColumnsProps[]>(
  props.table.columns.map((item) => {
    return { ...item, show: true };
  })
);
const handleColumnsChange = (columns: TableColumnsProps[]) => {
  const mergedArray = mergeWith(
    newColumns.value,
    columns,
    (_objValue, srcValue, key) => {
      if (key === 'show') {
        return srcValue;
      }
    }
  );
  newColumns.value = mergedArray;
};

// 选择框
const handleSelectionChange = (selection: any[]) => {
  emits('selectionChange', selection);
};
</script>
<style lang="scss" scoped>
.tableContainerComponent {
  & > .handleBox {
    margin-bottom: var(--normal-padding);
  }
  & > .pageBox {
    margin-top: var(--normal-padding);
  }
}
</style>
