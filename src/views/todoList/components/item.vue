<template>
  <div class="todoItemComponent">
    <div class="leftBox">
      <div class="checkBox">
        <el-checkbox @change="activeChange" class="item" v-model="active" />
      </div>
      <div class="title" :class="{ active }">
        {{ item.title }}
      </div>
    </div>
    <div class="rightBox">
      <div class="iconBtn navbarFunItem" @click="edit">
        <i class="ri-edit-2-line" />
      </div>
      <div class="iconBtn navbarFunItem" @click="remove">
        <i class="ri-delete-bin-6-line" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
export interface Todo {
  id: string | number;
  title: string;
  active: boolean;
  createTime: string;
  endTime?: string;
}

interface ComponentProps {
  item: Todo;
}

const props = defineProps<ComponentProps>();
const emits = defineEmits(['change', 'remove', 'edit']);
const active = ref<boolean>(props.item.active);

const activeChange = (val: boolean) => {
  emits('change', { ...props.item, active: val });
};

const remove = () => {
  emits('remove', props.item);
};

const edit = () => {
  emits('edit', props.item);
};
</script>
<style lang="scss" scoped>
.todoItemComponent {
  padding: calc(var(--normal-padding) - 6px) var(--normal-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .leftBox {
    display: flex;
    align-items: center;
    flex: 1;
    & > .title {
      font-size: 14px;
      color: #424242;
      margin-left: 16px;
      &.active {
        text-decoration: line-through;
        color: #777;
      }
    }
    & > .checkBox {
      width: 16px;
      height: 16px;
      & > .item {
        width: 100%;
        height: 100%;
        :deep(.el-checkbox__inner) {
          border-radius: 50%;
          width: 16px;
          height: 16px;
        }
        :deep(.el-checkbox__inner::after) {
          top: 2px;
          left: 5px;
        }
      }
    }
  }
  & > .rightBox {
    margin-left: 30px;
    display: flex;
    align-items: center;
    margin: 0 -5px;
    & > .iconBtn {
      margin: 0 5px;
      width: 30px;
      height: 30px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
