<template>
  <div class="container">
    <div class="searchBox">
      <el-form label-position="left" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-input placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="0">
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tableBox">
      <tableContainer
        :table="{
          columns: tableColumns,
          data: tableData,
          extraColumns: tableExtraColumns
        }"
        :handle="{ leftButtons: leftButtons }"
        :page="{ total, currentPage }"
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
      </tableContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import tableContainer from '@/components/TableContainer/index.vue';
import {
  TableColumnsProps,
  HandleLeftProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';

const tableColumns: TableColumnsProps[] = [
  {
    label: '头像',
    prop: 'avatar',
    width: '70',
    slot: true,
    align: 'center'
  },
  {
    label: '用户名',
    prop: 'username',
    align: 'center',
    width: '180',
    showOverflowTooltip: true
  },
  {
    prop: 'phone',
    label: '手机号',
    width: '180',
    align: 'center'
  },
  {
    label: '角色',
    prop: 'role',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: '200'
  },
  {
    label: '状态',
    prop: 'status',
    slot: true,
    width: '120',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建日期',
    width: '180',
    align: 'center'
  },
  {
    prop: 'updateTime',
    label: '更新日期',
    width: '180',
    align: 'center'
  },
  {
    prop: 'action',
    label: '操作',
    width: '180',
    slot: true,
    fixed: 'right',
    align: 'center'
  }
];

const tableExtraColumns: TableExtraColumnsProps = {
  index: true
};

const leftButtons: HandleLeftProps[] = [
  {
    label: '新增',
    type: 'primary',
    click: () => {
      console.log('新增');
    }
  },
  {
    label: '删除',
    type: 'danger',
    click: () => {
      console.log('删除');
    }
  }
];

const currentPage = ref(1);
const total = ref(100);
const tableData = ref([
  {
    username: 'zhongzhaoli',
    avatar: 'https://resource.lstaer.com/0543d7c3-9fda-49d4-ba46-1628f7ee0639',
    phone: '13662648176',
    status: true,
    role: '管理员、技术开发、社区运营',
    createTime: '2024-10-10 19:00:23',
    updateTime: '2024-10-10 19:00:23'
  },
  {
    username: 'Custer',
    avatar:
      'https://resource.lstaer.com/283df2f7-dc52-4a0a-8110-88cd38746dff?imageView2/1/w/100/h/100',
    phone: '18665814282',
    role: '管理员',
    status: false,
    createTime: '2024-10-10 19:00:23',
    updateTime: '2024-10-10 19:00:23'
  }
]);
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
