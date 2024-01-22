<template>
  <div class="tableContainerTableComponent">
    <el-table
      :data="data || []"
      :size="tableSize"
      :row-key="(extraConfig && extraConfig.rowKey) || ''"
      :tree-props="(extraConfig && extraConfig.treeProps) || DEFAULT_TREEPROPS"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        align="center"
        width="60"
        :label="(extraColumns && extraColumns.indexLabel) || '#'"
        v-if="extraColumns && extraColumns.index"
      />
      <el-table-column
        type="selection"
        align="center"
        width="60"
        :label="(extraColumns && extraColumns.selectionLabel) || '#'"
        v-if="extraColumns && extraColumns.selection"
      />
      <template v-for="item in columns" :key="item.prop">
        <template v-if="item.show">
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :align="item.align"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            v-if="item.slot"
          >
            <template v-slot="scope">
              <slot :name="item.prop" :row="scope.row" :index="scope.$index" />
            </template>
          </el-table-column>
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :align="item.align"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            v-else
          />
        </template>
      </template>
    </el-table>
  </div>
</template>
<script setup lang="ts">
const DEFAULT_TREEPROPS = { children: 'children', hasChildren: 'hasChildren' };
import { computed } from 'vue';
import { TableComponentProps } from '../types';
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

const tableSize = computed(() => appStore.tableSize);

defineProps<TableComponentProps>();
const emits = defineEmits(['selectionChange']);

const handleSelectionChange = (selection: any[]) => {
  emits('selectionChange', selection);
};
</script>
<style lang="scss" scoped></style>
