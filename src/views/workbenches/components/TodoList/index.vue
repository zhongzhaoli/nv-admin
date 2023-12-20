<template>
  <Card title="待办事项">
    <template #action>
      <el-button type="primary" link>查看全部</el-button>
    </template>
    <template #default>
      <div class="cardBody">
        <el-scrollbar class="scrollbar">
          <div class="listBox">
            <Item
              class="item"
              v-for="(item, index) in listData"
              :key="index"
              :toDo="item"
            />
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #footer>
      <div class="inputBox">
        <el-input placeholder="请输入事项" v-model="todoText" />
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card/index.vue';
import Item, { type Todo } from './item.vue';

const todoText = ref<string>('');
const listData: Todo[] = [
  {
    title: '完成Vue3项目初始化',
    active: false
  },
  {
    title: '完成每日日报',
    active: false
  },
  {
    title: '给财务报销单',
    active: false
  }
  // {
  //   title: '技术部开会',
  //   active: false
  // },
  // {
  //   title: '新项目ER图绘制',
  //   active: false
  // },
  // {
  //   title: '线上项目部署优化',
  //   active: false
  // }
];
</script>
<style lang="scss" scoped>
.cardBody {
  height: 220px;
  & > .scrollbar {
    padding: 0 14px;
    & .listBox {
      & > .item {
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
