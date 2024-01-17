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
      <div>
        <el-button circle @click="refresh()">
          <i class="ri-refresh-line" />
        </el-button>
      </div>
      <div>
        <el-dropdown trigger="click" @command="tableChangeSize">
          <el-button circle>
            <i class="ri-text-spacing" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in TABLE_SIZE_LIST"
                :key="item.key"
                :command="item.key"
                :disabled="item.key === tableSize"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-button circle>
          <i class="ri-equalizer-line" />
        </el-button>
      </div>
      <slot name="right" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { HandleLeftProps, HandleComponentProps } from '../types';
import { ELEMENT_UI_SIZE, TABLE_SIZE_LIST } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

defineProps<HandleComponentProps>();
const emits = defineEmits(['leftButtonClick', 'refresh']);

// 左边按钮点击
const leftButtonClick = (item: HandleLeftProps, index: number) => {
  item.click && item.click();
  emits('leftButtonClick', { item, index });
};

// 表格大小
const tableSize = computed(() => appStore.tableSize);
const tableChangeSize = (key: ELEMENT_UI_SIZE) => {
  appStore.setTableSize(key);
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
  & > .rightBox {
    display: flex;
    align-items: center;
    & > div:not(:last-child) {
      margin-right: var(--normal-padding);
      & button {
        outline: none;
      }
    }
  }
}
</style>
