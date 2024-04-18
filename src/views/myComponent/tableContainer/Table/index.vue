<template>
  <div class="tableShowTable">
    <div class="tableBox">
      <TableContainer
        :table="{
          columns: tableColumns,
          data: tableData,
          extraColumns: tableExtraColumns
        }"
        :handle="{
          show: false
        }"
        :page="{ total, currentPage, pageSize }"
        @refresh="refresh"
        @page-change="pageChange"
        @handle-left-click="handleLeftClick"
      >
        <template #table-avatar="{ row }">
          <el-avatar :src="row.avatar" :size="40" shape="square" />
        </template>
        <template #table-status="{ row }">
          <SwitchHandle v-model="row.status" :pId="row.id" :api="() => {}" />
        </template>
        <template #table-action="{ row }">
          <el-button type="primary" link @click="editDialogOpen(row)">{{
            $t('msg.edit')
          }}</el-button>
          <el-button type="primary" link @click="deleteDept(row.id)">{{
            $t('msg.delete')
          }}</el-button>
        </template>
      </TableContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
import TableContainer from '@/components/TableContainer/index.vue';
import SwitchHandle from '@/components/SwitchHandle/index.vue';
import { tableColumns, tableExtraColumns, tableData } from './config';
import { PAGE, PAGE_SIZE } from '@/constants/app';
import { ElMessage } from 'element-plus';
import { HandleLeftProps } from '@/components/TableContainer/types';
import { ref } from 'vue';
defineOptions({
  name: 'SystemDepartment'
});

const total = ref<number>(3);
const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(PAGE_SIZE);
const loading = ref<boolean>(false);
const filterObject = ref<any>();

const refresh = () => {
  loading.value = true;
  ElMessage.success('刷新表格');
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

const pageChange = () => {
  ElMessage.success(`分页切换 - 现在是${currentPage.value}页`);
};
const handleLeftClick = (obj: { item: HandleLeftProps }) => {
  const { item } = obj;
  if (item.key === 'create') ElMessage.success('现在是新增操作');
  if (item.key === 'edit') ElMessage.warning('现在是编辑操作');
  if (item.key === 'delete') ElMessage.error('现在是删除操作');
};

const getListFun = () => {
  ElMessage.success('提交筛选条件');
  ElMessage.info(JSON.stringify(filterObject.value));
};

const editDialogOpen = (row: any) => {
  ElMessage.info(`编辑ID为 ${row.id} 的数据`);
};

const deleteDept = (id: number) => {
  ElMessage.error(`删除ID为 ${id} 的数据`);
};
</script>
<style lang="scss" scoped>
.tableShowTable {
  .tableBox {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: var(--normal-padding);
    margin-top: var(--normal-padding);
  }
  .avatarBox {
    margin-bottom: 24px;
  }
}
</style>
