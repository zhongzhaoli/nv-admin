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
      <div class="handleBox">
        <div class="leftBox">
          <el-button type="primary">新增</el-button>
          <el-button type="danger">删除</el-button>
        </div>
        <div class="rightBox">
          <el-button circle>
            <i class="ri-refresh-line" />
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" size="large">
        <el-table-column type="index" width="60" label="#" align="center" />
        <el-table-column prop="avatar" label="头像" width="70" align="center">
          <template #default="{ row }">
            <div class="usernameBox">
              <el-avatar :src="row.avatar" :size="32" circle />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          width="180"
          label="用户名"
          show-overflow-tooltip
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="role"
          label="角色"
          align="center"
          show-overflow-tooltip
          min-width="200"
        />
        <el-table-column prop="status" label="状态" width="120" align="center">
          <el-switch />
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="180"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180"
          align="center"
        />
        <el-table-column
          prop="handle"
          label="操作"
          width="180"
          fixed="right"
          align="center"
        >
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      <div class="paginationBox">
        <el-pagination
          v-model="page"
          :total="total"
          layout="total, prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const page = ref(1);
const total = ref(100);
const tableData = ref([
  {
    username: 'zhongzhaoli',
    avatar: 'https://resource.lstaer.com/0543d7c3-9fda-49d4-ba46-1628f7ee0639',
    phone: '13662648176',
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
