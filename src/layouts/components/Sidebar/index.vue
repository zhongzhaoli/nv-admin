<template>
  <div class="sidebarContainer" :class="{ hideSidebar: isCollapse }">
    <Logo :collapse="isCollapse" />
    <div class="menuBox">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 100%"
        mode="inline"
        :items="items"
        :inline-collapsed="isCollapse"
        @click="handleClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './components/logo/index.vue';
import { h, reactive, ref, VueElement, computed, watch } from 'vue';
import type { ItemType } from 'ant-design-vue';
import { useAppStore } from '@/store/modules/app';

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>(['1']);
const appStore = useAppStore();

const isCollapse = computed(() => !appStore.sidebarOpened);
watch(
  () => isCollapse.value,
  (val) => {
    if (val) {
      openKeys.value = [];
    } else {
      openKeys.value = ['sub1'];
    }
  },
  {
    immediate: true
  }
);

const handleClick = () => {};

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem(
    'Navigation One',
    'sub1',
    () => h('i', { class: 'ri-dashboard-line' }),
    [
      getItem(
        'Item 1',
        'g1',
        null,
        [getItem('Option 1', '1'), getItem('Option 2', '2')],
        'group'
      ),
      getItem(
        'Item 2',
        'g2',
        null,
        [getItem('Option 3', '3'), getItem('Option 4', '4')],
        'group'
      )
    ]
  ),

  getItem('Navigation Two', 'sub2', () => h('i', { class: 'ri-user-line' }), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8')
    ])
  ]),

  getItem(
    'Navigation Three',
    'sub4',
    () => h('i', { class: 'ri-shield-user-line' }),
    [
      (getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'))
    ]
  )
]);
</script>
<style lang="scss" scoped>
.sidebarContainer {
  border-right: 1px solid var(--normal-border-color);
  background-color: var(--sidebar-background-color);
  box-sizing: border-box;
  transition-duration: 0.3s;
  &.hideSidebar {
    width: var(--sidebar-closed-width) !important;
  }
  & > .menuBox {
    height: calc(100vh - var(--navbar-height));
    overflow: auto;
  }
}
</style>
