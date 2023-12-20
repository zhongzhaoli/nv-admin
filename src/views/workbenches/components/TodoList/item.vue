<template>
  <div class="needDoComponent">
    <div class="title">{{ toDo.title }}</div>
    <div class="checkBox">
      <el-checkbox class="item" v-model="active" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
export interface Todo {
  title: string;
  active: boolean;
}
interface TodoProps {
  toDo: Todo;
}
defineProps<TodoProps>();
const active = ref<boolean>(false);
</script>
<style lang="scss" scoped>
.needDoComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .title {
    font-size: 14px;
    color: #424242;
  }
  & > .checkBox {
    & > .item {
      transform: scale(1.3);
      :deep(.el-checkbox__inner) {
        border-radius: 50%;
      }
    }
  }
}
</style>
