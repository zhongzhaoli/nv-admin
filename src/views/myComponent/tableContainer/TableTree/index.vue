<template>
  <div class="tableShowTableTree">
    <div class="tableBox">
      <TableContainer
        :table="{
          columns: tableColumns,
          extraConfig: tableExtraConfig,
          data: tableData
        }"
      >
        <template #table-title="{ row }">
          <i :class="row.meta.icon" />
          <span style="padding-left: 10px">{{ row.meta.title }}</span>
        </template>
        <template #table-hidden="{ row }">
          <el-tag type="success" v-if="!row.meta.hidden">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </TableContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TableContainer from '@/components/TableContainer/index.vue';
import { tableColumns, tableExtraConfig } from './config';
const tableData = ref<any[]>([
  {
    id: '5bfbc1c8-d9d6-4f64-9d1a-56b1aa31339a',
    pid: '0',
    component: 'dashboard/index.vue',
    name: 'Dashboard',
    path: '/dashboard',
    children: [],
    meta: {
      type: 'SINGLEMENU',
      title: '数据看板',
      icon: 'ri-dashboard-line',
      hidden: false,
      affix: true,
      sort: 1,
      breadcrumbHidden: false,
      keepAlive: true
    }
  },
  {
    id: 'ba6d9f52-35c0-4328-b9ad-76fc771de821',
    pid: '0',
    component: 'Layout',
    name: 'System',
    path: '/system',
    children: [
      {
        id: '8d89e8d4-7f1f-4523-9329-f2c9de6cc8d8',
        pid: 'ba6d9f52-35c0-4328-b9ad-76fc771de821',
        component: 'system/user/index.vue',
        name: 'SystemUser',
        path: 'user',
        children: [],
        meta: {
          type: 'MENU',
          title: '用户管理',
          icon: 'ri-user-line',
          hidden: false,
          affix: false,
          sort: 2,
          breadcrumbHidden: false,
          keepAlive: false
        }
      },
      {
        id: '76341000-d5ae-46c2-9ef1-294aa3d3b7fd',
        pid: 'ba6d9f52-35c0-4328-b9ad-76fc771de821',
        component: 'system/department/index.vue',
        name: 'SystemDepartment',
        path: 'department',
        children: [],
        meta: {
          type: 'MENU',
          title: '部门管理',
          icon: 'ri-computer-line',
          hidden: false,
          affix: false,
          sort: 3,
          breadcrumbHidden: false,
          keepAlive: false
        }
      },
      {
        id: 'd80d3346-0a9c-43a3-b4ee-619488152338',
        pid: 'ba6d9f52-35c0-4328-b9ad-76fc771de821',
        component: 'system/role/index.vue',
        name: 'SystemRole',
        path: 'role',
        children: [],
        meta: {
          type: 'MENU',
          title: '角色管理',
          icon: 'ri-admin-line',
          hidden: false,
          affix: false,
          sort: 4,
          breadcrumbHidden: false,
          keepAlive: false
        }
      },
      {
        id: 'f815ba3d-320b-41fe-8aa4-1b3ee08094fb',
        pid: 'ba6d9f52-35c0-4328-b9ad-76fc771de821',
        component: 'system/menu/index.vue',
        name: 'SystemMenu',
        path: 'menu',
        children: [],
        meta: {
          type: 'MENU',
          title: '菜单管理',
          icon: 'ri-node-tree',
          hidden: false,
          affix: false,
          sort: 5,
          breadcrumbHidden: false,
          keepAlive: false
        }
      }
    ],
    meta: {
      type: 'CATA',
      title: '系统管理',
      icon: 'ri-list-settings-line',
      hidden: false,
      affix: false,
      sort: 10,
      breadcrumbHidden: false,
      keepAlive: false
    }
  }
]);
</script>
<style lang="scss" scoped>
.tableShowTableTree {
  .tableBox {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: var(--normal-padding);
    margin-top: var(--normal-padding);
  }
}
</style>
