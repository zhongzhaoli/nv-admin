<template>
  <div class="container">
    <FilterContainer
      v-model="filterObject"
      :columns="filterColumns"
      :submit-fn="getListFun"
    />
    <div class="tableBox" v-loading="loading">
      <TableContainer
        :table="{
          columns: tableColumns,
          data: tableData,
          extraColumns: tableExtraColumns
        }"
        :handle="{ leftButtons: leftButtons }"
        :page="{ total, currentPage, pageSize }"
        @pageChange="pageChange"
        @refresh="refresh"
      >
        <template #table-avatar="{ row }">
          <el-avatar :src="row.avatar" :size="32" />
        </template>
        <template #table-status="{ row }">
          <el-switch v-model="row.status" />
        </template>
        <template #table-action>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </TableContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TableContainer from '@/components/TableContainer/index.vue';
import FilterContainer from '@/components/FilterContainer/index.vue';
import { PAGE_SIZE, PAGE } from '@/constants/app';
import * as API_USERS from '@/api/users';
import {
  tableColumns,
  tableExtraColumns,
  leftButtons,
  filterColumns
} from './config';
defineOptions({
  name: 'SystemUser'
});

const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(PAGE_SIZE);
const total = ref(0);
const tableData = ref<any>([]);
const loading = ref<boolean>(true);
const filterObject = ref({});

const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_USERS.getUsersList({
      page: currentPage.value,
      pageSize: pageSize.value,
      ...filterObject.value
    });
    currentPage.value = data.page;
    tableData.value = data.list;
    total.value = data.total;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const pageChange = (v: { page: number; pageSize: number }) => {
  currentPage.value = v.page;
  pageSize.value = v.pageSize;
  getListFun();
};

const refresh = () => {
  currentPage.value = PAGE;
  getListFun();
};

onMounted(() => {
  getListFun();
});
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  .searchBox {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: var(--normal-padding);
    padding-bottom: 0;

    :deep(.el-form-item) {
      margin-bottom: var(--normal-padding);
    }
  }
  .tableBox {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: var(--normal-padding);
    margin-top: var(--normal-padding);
    .usernameBox {
      display: flex;
      align-items: center;
      justify-content: center;
      & > .username {
        margin-left: 6px;
        font-size: 14px;
      }
    }
    & > .handleBox {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & > .paginationBox {
      margin-top: var(--normal-padding);
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
