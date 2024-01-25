<template>
  <div class="container">
    <div class="listBox">
      <div class="header">{{ $t('msg.todoList.title') }}</div>
      <div class="list" v-if="!loading">
        <draggable v-model="listData" item-key="id">
          <template #item="{ element }">
            <div class="item">
              <Item
                @change="activeChange"
                @remove="(v) => removeFun(v, 'list')"
                @edit="editFun"
                :item="element"
              />
            </div>
          </template>
        </draggable>
        <div class="tag" v-if="listData.length && endData.length">
          <el-tag disable-transitions type="info">已完成</el-tag>
        </div>
        <div class="item" v-for="item in endData" :key="item.id">
          <Item
            @change="activeChange"
            @remove="(v) => removeFun(v, 'end')"
            @edit="editFun"
            :item="item"
          />
        </div>
      </div>
      <div class="loading" v-if="loading" v-loading="loading" />
    </div>
    <div class="inputBox">
      <el-input
        :placeholder="$t('msg.workbenches.toDo.placeholder')"
        v-model="todoText"
        @keyup.enter="addTodo"
      />
    </div>
    <Teleport to="body">
      <el-drawer v-model="drawerOpen" title="编辑事项">
        <el-form label-position="top">
          <el-form-item label="待办事项：">
            <el-input type="textarea" v-model="editFormValue.title" autosize />
          </el-form-item>
          <el-form-item label="状态：">
            <el-radio-group v-model="editFormValue.active">
              <el-radio-button :label="true">已完成</el-radio-button>
              <el-radio-button :label="false">未完成</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker
              v-model="editFormValue.createTime"
              type="datetime"
              placeholder="选择日期"
              disabled
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="完成时间：" v-if="editFormValue.active">
            <el-date-picker
              v-model="editFormValue.endTime"
              type="datetime"
              placeholder="选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="saveEditChange"
            >保存</el-button
          >
          <el-button @click="drawerOpen = false">取消</el-button>
        </template>
      </el-drawer>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Item, { type Todo } from './components/item.vue';
import { useMessageBox } from '@/hooks/useMessageBox';
import draggable from 'vuedraggable';
import { cloneDeep } from 'lodash-es';
import * as API_TODOLIST from '@/api/todoList/index';
import { todoListDto } from '@/api/todoList/index';
import { ElMessage } from 'element-plus';
import WorkbenchesMitt from '@/views/workbenches/mitt';
import TodoListMitt from './mitt';

const todoText = ref<string>('');

const listData = ref<Todo[]>([]);
const endData = ref<Todo[]>([]);
const loading = ref<boolean>(true);
export interface ApiDataProps {
  list: Todo[];
  end: Todo[];
}
// 获取代办事项列表
const getListFun = async (load: boolean = true) => {
  if (load) loading.value = true;
  try {
    const { data } = await API_TODOLIST.getTodoList<ApiDataProps>();
    listData.value = data!.list;
    endData.value = data!.end;
    WorkbenchesMitt.dataChange({
      key: 'todoList',
      value: listData.value.length
    });
    TodoListMitt.dataChange<Todo[]>(listData.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 添加事项
const addTodo = async () => {
  const text = todoText.value.trim();
  listData.value.push({
    title: text,
    active: false
  } as unknown as Todo);
  todoText.value = '';
  await API_TODOLIST.createTodo({
    title: text
  });
  getListFun(false);
};

// 状态变化
const activeChange = (nV: Todo) => {
  setTimeout(async () => {
    if (nV.active) {
      const index = listData.value.findIndex((item) => item.id === nV.id);
      listData.value.splice(index, 1);
      endData.value.unshift(nV);
    } else {
      const index = endData.value.findIndex((item) => item.id === nV.id);
      endData.value.splice(index, 1);
      listData.value.push(nV);
    }
    await API_TODOLIST.updateTodo<todoListDto>(nV.id, { active: nV.active });
    getListFun(false);
  }, 300);
};

// 删除
const removeFun = (item: Todo, type: 'list' | 'end') => {
  useMessageBox('确定删除该事项吗？', async () => {
    try {
      await API_TODOLIST.deleteTodo(item.id);
      ElMessage.success('删除成功');
      let index: number;
      if (type === 'end') {
        index = endData.value.findIndex((item) => item.id === item.id);
        endData.value.splice(index, 1);
      }
      if (type === 'list') {
        index = listData.value.findIndex((item) => item.id === item.id);
        listData.value.splice(index, 1);
      }
      getListFun(false);
    } catch (err) {
      console.error(err);
    }
  });
};

// 编辑
const drawerOpen = ref<boolean>(false);
const editFormValue = ref<Todo>({} as Todo);
const submitLoading = ref<boolean>(false);
const editFun = (item: Todo) => {
  editFormValue.value = cloneDeep(item);
  drawerOpen.value = true;
};
const saveEditChange = async () => {
  submitLoading.value = true;
  try {
    await API_TODOLIST.updateTodo<todoListDto>(
      editFormValue.value.id,
      editFormValue.value
    );
    drawerOpen.value = false;
    ElMessage.success('操作成功');
    getListFun(false);
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
  height: 100%;
  position: relative;

  & > .listBox {
    padding: var(--normal-padding);

    overflow: auto;
    height: calc(100% - 50px);
    & > .header {
      font-size: 20px;
      padding-left: var(--normal-padding);
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      margin-bottom: var(--normal-padding);
    }
    & .tag {
      margin: 6px 0;
      padding-left: 10px;
    }
    & .item {
      cursor: grab;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid var(--normal-border-color);
      margin-bottom: 1px;
    }
    & > .loading {
      width: 100%;
      height: 100px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid var(--normal-border-color);
    }
  }
  .inputBox {
    height: 50px;
    background-color: #fff;
    padding: 10px;
    width: 100%;
    bottom: var(--normal-padding);
    box-shadow:
      0 1px 2px -2px rgba(0, 0, 0, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.05),
      0 5px 12px 4px rgba(0, 0, 0, 0.05);
    & > .el-input {
      :deep(.el-input__wrapper) {
        border: none;
        box-shadow: none;
      }
    }
  }
}
</style>
