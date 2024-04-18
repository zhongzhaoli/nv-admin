<template>
  <div class="container">
    <FilterContainer
      v-model="filterObject"
      :columns="filterColumns"
      @submit="getListFun"
    />
    <div class="tableBox" v-loading="loading">
      <TableContainer
        :table="{
          columns: tableColumns,
          data: tableData,
          extraColumns: tableExtraColumns
        }"
        :handle="{
          leftButtons: leftButtons
        }"
        :page="{ total, currentPage, pageSize }"
        @refresh="refresh"
        @page-change="pageChange"
        @handle-left-click="handleLeftClick"
      >
        <template #table-avatar="{ row }">
          <el-avatar :src="row.avatar" :size="32" shape="square" />
        </template>
        <template #table-action="{ row }">
          <el-button type="primary" link @click="editDialogOpen(row)">{{
            $t('msg.edit')
          }}</el-button>
          <el-button type="primary" link @click="getMemberList(row.id)">{{
            $t('msg.member')
          }}</el-button>
          <el-button type="primary" link @click="deleteDept(row.id)">{{
            $t('msg.delete')
          }}</el-button>
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
        <div class="avatarBox flex-center">
          <UploadAvatar shape="square" v-model="editFormValue.avatar" />
        </div>
        <el-form-item label="部门名称：">
          <el-input v-model="editFormValue.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            type="textarea"
            v-model="editFormValue.description"
            :rows="4"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
    </ConfirmDialog>
    <ConfirmDialog
      v-model="memberListVisible"
      class="bodyNoPadding"
      title="成员列表"
      width="500px"
      :submitLoading="submitLoading"
      :show-confirm-btn="false"
    >
      <MemberList
        ref="memberListRef"
        :id="departmentId"
        @updateList="getListFun"
      />
    </ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import FilterContainer from '@/components/FilterContainer/index.vue';
import TableContainer from '@/components/TableContainer/index.vue';
import ConfirmDialog from '@/components/ConfirmDialog/index.vue';
import UploadAvatar from '@/components/UploadAvatar/index.vue';
import MemberList from './components/memberList.vue';
import * as API_DEPARTMENT from '@/api/department/index';
import {
  DataProp,
  filterColumns,
  tableColumns,
  tableExtraColumns,
  leftButtons
} from './config';
import { PAGE, PAGE_SIZE } from '@/constants/app';
import { HandleLeftProps } from '@/components/TableContainer/types';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { useMessageBox } from '@/hooks/useMessageBox';
defineOptions({
  name: 'SystemDepartment'
});

const tableData = ref<any[]>([]);
const total = ref<number>(0);
const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(PAGE_SIZE);
const loading = ref<boolean>(false);
const filterObject = ref<any>();
// 获取部门列表
const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_DEPARTMENT.getDeptList({
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

// 获取部门成员列表
const departmentId = ref<string | number>('');
const memberListVisible = ref<boolean>(false);
const memberListRef = ref<{ getMemberList: Function } | null>(null);
const getMemberList = (id: string | number) => {
  memberListVisible.value = true;
  departmentId.value = id;
  nextTick(() => {
    if (memberListRef.value) {
      memberListRef.value.getMemberList();
    }
  });
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
const dialogTitle = ref<string>('');
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
    editFormValue.value = {};
    openDialog('创建部门');
  }
};
// 编辑按钮点击
const editDialogOpen = (row: DataProp) => {
  editFormValue.value = cloneDeep(row);
  openDialog('编辑部门');
};
// 确认编辑
const editFun = async () => {
  if (!editFormValue.value.avatar) return ElMessage.error('请上传部门封面');
  submitLoading.value = true;
  try {
    if (editFormValue.value.id === undefined) {
      await API_DEPARTMENT.createDept(editFormValue.value);
    } else {
      await API_DEPARTMENT.updateDept<DataProp>(
        editFormValue.value.id,
        editFormValue.value
      );
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

// 删除部门
const deleteDept = (deptId: string | number) => {
  useMessageBox('确定删除该部门吗？', async () => {
    try {
      await API_DEPARTMENT.deleteDept(deptId);
      ElMessage.success('删除成功');
      getListFun();
    } catch (err) {
      console.error(err);
    }
  });
};

getListFun();
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
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

  .memberListBox {
    min-height: 300px;
  }
}
</style>
