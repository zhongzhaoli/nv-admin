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
      <div v-if="columns && columns.length">
        <el-button circle @click="columnSetting">
          <i class="ri-equalizer-line" />
        </el-button>
      </div>
      <slot name="right" />
    </div>
    <Teleport to="body">
      <el-drawer v-model="drawerOpen" title="字段设置">
        <div v-for="item in newColumns" :key="item.prop">
          <el-checkbox :label="item.prop" v-model="item.show">{{
            item.label
          }}</el-checkbox>
        </div>
        <template #footer>
          <el-button type="primary" @click="saveColumns">保存</el-button>
          <el-button @click="drawerOpen = false">取消</el-button>
        </template>
      </el-drawer>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  HandleLeftProps,
  HandleComponentProps,
  TableColumnsProps
} from '../types';
import { ELEMENT_UI_SIZE, TABLE_SIZE_LIST } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
import { cloneDeep } from 'lodash-es';
const appStore = useAppStore();

const props = defineProps<HandleComponentProps>();
const emits = defineEmits(['leftButtonClick', 'refresh', 'columnsChange']);

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

// 刷新
const refresh = () => {
  emits('refresh', 'handle');
};

// 字段筛选
const drawerOpen = ref<boolean>(false);
const columnSetting = () => {
  drawerOpen.value = true;
};
const newColumns = ref<TableColumnsProps[]>([]);
watch(
  () => props.columns,
  () => {
    if (props.columns && props.columns.length) {
      newColumns.value = cloneDeep(props.columns);
    }
  },
  {
    immediate: true,
    deep: true
  }
);
const saveColumns = () => {
  emits('columnsChange', newColumns.value);
  drawerOpen.value = false;
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
