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
          extraConfig: tableExtraConfig,
          data: tableData
        }"
        :handle="{
          leftButtons: leftButtons
        }"
        @refresh="getListFun"
        @handle-left-click="handleLeftClick"
      >
        <template #table-title="{ row }">
          <i :class="row.meta.icon" />
          <span style="padding-left: 10px">{{ row.meta.title }}</span>
        </template>
        <template #table-hidden="{ row }">
          <el-tag type="success" v-if="!row.meta.hidden">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
        <template #table-action="{ row }">
          <el-button type="primary" link @click="editDialogOpen(row)">{{
            $t('msg.edit')
          }}</el-button>
          <el-button type="primary" link @click="deleteMenu(row)">{{
            $t('msg.delete')
          }}</el-button>
        </template>
      </TableContainer>
    </div>
    <ConfirmDialog
      v-model="editVisible"
      :title="dialogTitle"
      :submit-loading="submitLoading"
      width="600px"
      @submit="editFun"
    >
      <EditForm
        ref="editForm"
        :defaultValue="editFormValue"
        :menus="treeSelectData"
      />
    </ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TableContainer from '@/components/TableContainer/index.vue';
import FilterContainer from '@/components/FilterContainer/index.vue';
import ConfirmDialog from '@/components/ConfirmDialog/index.vue';
import EditForm, { MenusProps } from './components/Form.vue';
import {
  filterColumns,
  tableColumns,
  tableExtraConfig,
  leftButtons,
  DataProp
} from './config';
import * as API_MENU from '@/api/menu';
import { MenuListParams } from '@/api/menu';
import { HandleLeftProps } from '@/components/TableContainer/types';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { useMessageBox } from '@/hooks/useMessageBox';
defineOptions({
  name: 'SystemMenu'
});

const tableData = ref<DataProp[]>([]);
const loading = ref<boolean>(false);
const filterObject = ref<MenuListParams>({} as MenuListParams);
const treeSelectData = ref<MenusProps[]>([]);
// 获取菜单列表
const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_MENU.getMenuList<DataProp[]>(filterObject.value);
    tableData.value = data || [];
    treeSelectData.value = generatePidList(tableData.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
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
      pid: '0',
      hidden: false,
      keepAlive: false,
      affix: false,
      breadcrumbHidden: false,
      sort: 1
    };
    openDialog('创建菜单');
  }
};
// 编辑按钮点击
const editDialogOpen = (row: DataProp) => {
  editFormValue.value = cloneDeep(row);
  openDialog('编辑菜单');
};
// 确认编辑
const editForm = ref();
const editFun = async () => {
  if (!editForm.value) return;
  const data = editForm.value.getFormValue();
  submitLoading.value = true;
  try {
    if (data.id === undefined) {
      await API_MENU.createMenu(data);
    } else {
      await API_MENU.updateMenu<DataProp>(data.id, data);
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

// 生成树目录 选择上级菜单元数据
const generatePidList = (arr: DataProp[]): MenusProps[] => {
  const fn = (list: DataProp[]) => {
    const result: MenusProps[] = [];
    list.forEach((item) => {
      let newItem: MenusProps;
      if (
        item.meta &&
        item.id &&
        item.meta.title &&
        item.meta.type &&
        item.meta.type !== 'BUTTON'
      ) {
        newItem = {
          label: item.meta.title,
          value: item.id,
          type: item.meta.type,
          children: []
        };
        if (item.children) {
          newItem.children.push(...fn(item.children as DataProp[]));
        }
        result.push(newItem);
      }
    });
    return result;
  };
  const children: MenusProps[] = fn(arr);
  return [{ label: '根目录', type: 'ROOT', value: '0', children }];
};

// 删除菜单
const deleteMenu = (row: DataProp) => {
  useMessageBox('确定删除该菜单吗？', async () => {
    try {
      await API_MENU.deleteMenu(row.id);
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
}
</style>
