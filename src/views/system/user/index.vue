<template>
  <div class="container">
    <div class="flexBox">
      <div class="departmentBox">
        <div class="department" v-loading="deptLoading">
          <div class="header flex-center">
            <div class="title">部门列表</div>
            <div class="icon flex-center" @click="deptRefresh">
              <i class="ri-restart-line" />
            </div>
          </div>
          <div class="body">
            <el-tree
              node-key="id"
              :data="deptList"
              :props="{ label: 'name' }"
              :expand-on-click-node="false"
              :current-node-key="deptId"
              :highlight-current="true"
              default-expand-all
              @node-click="deptChange"
              check-strictly
            />
          </div>
        </div>
      </div>
      <div class="user">
        <FilterContainer
          :col="8"
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
            :handle="{ leftButtons }"
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
              <el-button type="primary" link @click="editDialogOpen(row)">{{
                $t('msg.edit')
              }}</el-button>
              <el-button type="primary" link @click="openSelectRole(row.id)">{{
                $t('msg.role')
              }}</el-button>
              <el-button type="primary" link @click="deleteUser(row)">{{
                $t('msg.delete')
              }}</el-button>
            </template>
          </TableContainer>
        </div>
      </div>
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
          <UploadAvatar v-model="editFormValue.avatar" />
        </div>
        <el-form-item label="所属部门">
          <el-tree-select
            node-key="id"
            v-model="editFormValue.deptId"
            check-strictly
            :data="deptList"
            :props="{ label: 'name' }"
          />
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input
            v-model="editFormValue.username"
            :disabled="dialogTitle === '编辑用户'"
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
    <SelectTarget
      name-key="name"
      :submit-loading="selectRoleSubmitLoading"
      :api="API_ROLE.getRoleList"
      v-model="selectRoleVisible"
      @submit="submitFun"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TableContainer from '@/components/TableContainer/index.vue';
import { HandleLeftProps } from '@/components/TableContainer/types';
import FilterContainer from '@/components/FilterContainer/index.vue';
import ConfirmDialog from '@/components/ConfirmDialog/index.vue';
import UploadAvatar from '@/components/UploadAvatar/index.vue';
import SelectTarget from '@/components/SelectTarget/dialog.vue';
import { PAGE_SIZE, PAGE } from '@/constants/app';
import * as API_USERS from '@/api/users';
import * as API_ROLE from '@/api/role';
import { useDeptDataList } from '@/hooks/useDeptDataList';
import {
  DataProp,
  filterColumns,
  tableColumns,
  tableExtraColumns,
  leftButtons
} from './config';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { useMessageBox } from '@/hooks/useMessageBox';
defineOptions({
  name: 'SystemUser'
});

const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(PAGE_SIZE);
const total = ref(0);
const tableData = ref<DataProp[]>([]);
const loading = ref<boolean>(true);
const filterObject = ref<any>({});
const deptId = ref<string | number>(0);
const {
  deptList,
  loading: deptLoading,
  refresh: deptRefresh
} = useDeptDataList(true);

// 获取用户列表
const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_USERS.getUsersList({
      page: currentPage.value,
      pageSize: pageSize.value,
      deptId: deptId.value,
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
    editFormValue.value = {
      deptId: deptId.value
    };
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
      await API_USERS.updateUsers<DataProp>(
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

// 删除用户
const deleteUser = (row: DataProp) => {
  useMessageBox('确定删除该用户吗？', async () => {
    try {
      await API_USERS.deleteUsers(row.id);
      ElMessage.success('删除成功');
      getListFun();
    } catch (err) {
      console.error(err);
    }
  });
};

// 选择角色
const selectRoleVisible = ref<boolean>(false);
const selectRoleSubmitLoading = ref<boolean>(false);
const userId = ref<string | number>('');
const submitFun = async (list: any) => {
  selectRoleSubmitLoading.value = true;
  try {
    await API_USERS.usersSetRoles(userId.value, {
      ids: list.map((item: any) => item.id)
    });
    ElMessage.success('操作成功');
  } catch (err) {
    console.log(err);
  } finally {
    selectRoleSubmitLoading.value = false;
    selectRoleVisible.value = false;
  }
};
const openSelectRole = (id: number | string) => {
  userId.value = id;
  selectRoleVisible.value = true;
};

// 部门点击
const deptChange = (val: any) => {
  deptId.value = val.id;
  getListFun();
};

getListFun();
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;

  & > .flexBox {
    display: flex;
    width: 100%;
    height: 100%;
    & > .departmentBox {
      position: fixed;
      height: calc(100vh - var(--navbar-height) - var(--tagsView-height));
      width: 250px;
      padding: var(--normal-padding);
      padding-right: 0;
      & > .department {
        height: 100%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid var(--normal-border-color);
        overflow: auto;
        & > .header {
          padding-bottom: var(--normal-padding);
          justify-content: space-between;
          padding: var(--normal-padding);
          border-bottom: 1px solid var(--normal-border-color);
          & > .title {
            font-size: 16px;
            font-weight: bold;
          }
          & > .icon {
            color: #eaeaea;
            font-weight: bold;
            width: 25px;
            height: 25px;
            transition: background-color 0.3s;
            border-radius: 5px;
            font-size: 12px;
            color: var(--navbar-function-icon-color);
            background-color: rgba(0, 0, 0, 0.06);
            cursor: pointer;
          }
        }
        & > .body {
          padding: var(--normal-padding);
        }
      }
    }
    & > .user {
      width: calc(100% - 250px - var(--normal-padding));
      margin-left: calc(250px + var(--normal-padding));
      height: 100%;
      overflow: auto;
      padding: var(--normal-padding);
      padding-left: 0;
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
    margin-bottom: 24px;
  }
}
</style>
