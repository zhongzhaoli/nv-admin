<template>
  <Card :title="$t('msg.workbenches.toDo.title')" v-loading="loading">
    <template #action>
      <el-button type="primary" link @click="toAll">{{
        $t('msg.workbenches.more')
      }}</el-button>
    </template>
    <template #default>
      <div class="cardBody">
        <el-scrollbar class="scrollbar">
          <div class="listBox">
            <draggable v-model="listData" item-key="id">
              <template #item="{ element }">
                <Item class="item" :toDo="element" @change="activeChange" />
              </template>
            </draggable>
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #footer>
      <div class="inputBox">
        <el-input
          :placeholder="$t('msg.workbenches.toDo.placeholder')"
          v-model="todoText"
          @keyup.enter="addTodo"
        />
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card/index.vue';
import Item from './item.vue';
import { type Todo } from '@/views/todoList/components/item.vue';
import { type ApiDataProps } from '@/views/todoList/index.vue';
import { useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import * as API_TODOLIST from '@/api/todoList/index';
import { todoListDto } from '@/api/todoList/index';
import WorkbenchesMitt from '../../mitt';
import TodoListMitt from '@/views/todoList/mitt';
const router = useRouter();

const todoText = ref<string>('');
const listData = ref<Todo[]>([]);
const loading = ref<boolean>(true);
const toAll = () => {
  router.push('/todoList');
};

TodoListMitt.addListener<Todo[]>((val: Todo[]) => {
  listData.value = val;
});

// 获取代办事项列表
const getListFun = async (load: boolean = true) => {
  if (load) loading.value = true;
  try {
    const { data } = await API_TODOLIST.getTodoList<ApiDataProps>();
    listData.value = data!.list;
    WorkbenchesMitt.dataChange({
      key: 'todoList',
      value: listData.value.length
    });
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
    const index = listData.value.findIndex((item) => item.id === nV.id);
    listData.value.splice(index, 1);
    await API_TODOLIST.updateTodo<todoListDto>(nV.id, { active: nV.active });
    getListFun(false);
  }, 300);
};

getListFun();
</script>
<style lang="scss" scoped>
.cardBody {
  height: 220px;
  & > .scrollbar {
    padding: 0 14px;
    & .listBox {
      & .item {
        padding: 10px 14px;
        &:not(:last-child) {
          border-bottom: 1px solid #f6f6f6;
        }
      }
    }
  }
}
.inputBox {
  height: 50px;
  background-color: #fff;
  padding: 10px;
  & > .el-input {
    :deep(.el-input__wrapper) {
      border: none;
      box-shadow: none;
    }
  }
}
</style>
