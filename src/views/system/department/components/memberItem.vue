<template>
  <div class="memberItemComponent">
    <div class="close" @click="deleteMember">
      <i class="ri-close-line" />
    </div>
    <div class="avatar">
      <el-avatar :size="40" :src="avatar" />
    </div>
    <el-tooltip :content="name">
      <div class="name">{{ name }}</div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
interface ComponentProps {
  id: string | number;
  avatar: string;
  name: string;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['deleteMember']);

const deleteMember = () => {
  emits('deleteMember', props.id);
};
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.memberItemComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--normal-border-color);
  border-radius: 4px;
  padding: 12px 10px;
  position: relative;
  & > .close {
    position: absolute;
    top: 6px;
    right: 6px;
    background-color: var(--el-color-danger);
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
  }
  & > div.name {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    @include text-ellipsis(1);
    margin-top: 5px;
  }
}
</style>
