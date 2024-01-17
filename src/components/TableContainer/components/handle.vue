<template>
  <div class="tableContainerHandleComponent">
    <div class="leftBox">
      <el-button
        v-for="(item, index) in leftButtons"
        :type="item.type || ''"
        :key="index"
        @click="leftButtonClick(item, index)"
        >{{ item.label }}</el-button
      >
      <slot name="left" />
    </div>
    <div class="rightBox">
      <el-button circle @click="refresh()">
        <i class="ri-refresh-line" />
      </el-button>
      <slot name="right" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { HandleLeftProps, HandleComponentProps } from '../types';

defineProps<HandleComponentProps>();
const emits = defineEmits(['leftButtonClick', 'refresh']);

const leftButtonClick = (item: HandleLeftProps, index: number) => {
  item.click && item.click();
  emits('leftButtonClick', { item, index });
};

const refresh = () => {
  emits('refresh', 'handle');
};
</script>
<style lang="scss" scoped>
.tableContainerHandleComponent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
