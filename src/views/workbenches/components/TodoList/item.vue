<template>
  <div class="needDoComponent">
    <div class="title">{{ toDo.title }}</div>
    <div class="checkBox">
      <el-checkbox class="item" v-model="active" @change="activeChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { type Todo } from '@/views/todoList/components/item.vue';
interface TodoProps {
  toDo: Todo;
}
const props = defineProps<TodoProps>();
const emits = defineEmits(['change', 'remove', 'edit']);
const active = ref<boolean>(props.toDo.active);

const activeChange = (val: boolean) => {
  emits('change', { ...props.toDo, active: val });
};
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.needDoComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .title {
    font-size: 14px;
    color: #424242;
    @include text-ellipsis(2);
  }
  & > .checkBox {
    margin-left: 20px;
    & > .item {
      transform: scale(1.3);
      :deep(.el-checkbox__inner) {
        border-radius: 50%;
      }
    }
  }
}
</style>
