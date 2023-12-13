<template>
  <div class="sidebarContainer">
    <div class="logoBox">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="menuBox">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 100%"
        mode="inline"
        :items="items"
        @click="handleClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, reactive, ref, VueElement } from 'vue';
import type { ItemType } from 'ant-design-vue';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

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

  { type: 'divider' },

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
  ),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group'
  )
]);
</script>
<style lang="scss" scoped>
.sidebarContainer {
  width: 100%;
  border-right: 1px solid var(--normal-border-color);
  background-color: var(--sidebar-background-color);
  box-sizing: border-box;
  & > .logoBox {
    width: 100%;
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    justify-content: center;
    // border-bottom: 1px solid var(--normal-border-color);
    & > img {
      width: calc(100% - 80px);
      vertical-align: bottom;
    }
  }
  & > .menuBox {
    height: calc(100vh - var(--navbar-height));
    overflow: auto;
  }
}
</style>
