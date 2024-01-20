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
        @handleLeftClick="handleLeftClick"
      >
        <template #table-avatar="{ row }">
          <el-avatar :src="row.avatar" :size="32" />
        </template>
        <template #table-status="{ row }">
          <el-switch
            :active-value="1"
            :inactive-value="2"
            v-model="row.status"
          />
        </template>
        <template #table-action="{ row }">
          <el-button type="primary" link @click="editDialogOpen(row)"
            >编辑</el-button
          >
          <el-button type="primary" link>角色</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </TableContainer>
    </div>
    <ConfirmDialog
      v-model="editVisible"
      :title="dialogTitle"
      width="400px"
      :submitLoading="submitLoading"
      @submit="editFun"
    >
      <el-form label-position="left" label-width="85px">
        <div class="avatarBox">
          <UploadAvatar v-model="editFormValue.avatar" />
        </div>
        <el-form-item label="用户名：">
          <el-input
            v-model="editFormValue.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="editFormValue.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input
            v-model="editFormValue.realName"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
      </el-form>
    </ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TableContainer from '@/components/TableContainer/index.vue';
import { HandleLeftProps } from '@/components/TableContainer/types';
import FilterContainer from '@/components/FilterContainer/index.vue';
import ConfirmDialog from '@/components/ConfirmDialog/index.vue';
import UploadAvatar from './components/UploadAvatar.vue';
import { PAGE_SIZE, PAGE } from '@/constants/app';
import * as API_USERS from '@/api/users';
import {
  tableColumns,
  tableExtraColumns,
  leftButtons,
  filterColumns,
  DataProp
} from './config';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
defineOptions({
  name: 'SystemUser'
});

const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(PAGE_SIZE);
const total = ref(0);
const tableData = ref<DataProp[]>([]);
const loading = ref<boolean>(true);
const filterObject = ref<any>({});

// 获取用户列表
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

// 页数/页码改变
const pageChange = (v: { page: number; pageSize: number }) => {
  currentPage.value = v.page;
  pageSize.value = v.pageSize;
  getListFun();
};

// 刷新
const refresh = () => {
  currentPage.value = PAGE;
  getListFun();
};

// 编辑框
const editVisible = ref<boolean>(false);
const dialogTitle = ref<string>('编辑用户');
const editFormValue = ref<any>({});
const submitLoading = ref<boolean>(false);
// 打开编辑框，设置标题
const openDialog = (title: string) => {
  dialogTitle.value = title;
  editVisible.value = true;
};
// 新增按钮点击
const handleLeftClick = (obj: { item: HandleLeftProps }) => {
  const { item } = obj;
  if (item.key === 'create') {
    openDialog('创建用户');
  }
};
// 编辑按钮点击
const editDialogOpen = (row: DataProp) => {
  editFormValue.value = cloneDeep(row);
  openDialog('编辑用户');
};
// 确认编辑
const editFun = async () => {
  submitLoading.value = true;
  try {
    if (editFormValue.value.id === undefined) {
      await API_USERS.createUsers(editFormValue.value);
    } else {
      await API_USERS.updateUsers(editFormValue.value.id, editFormValue.value);
    }
    editVisible.value = false;
    ElMessage.success('操作成功');
    getListFun();
  } catch (err) {
    console.error(err);
  } finally {
    submitLoading.value = false;
  }
};

getListFun();
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

  .avatarBox {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
}
</style>
