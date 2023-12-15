<template>
  <div class="tagsViewContainer">
    <div
      class="tag flex-center"
      :class="{ active: item.active }"
      v-for="item in list"
      :key="item.title"
    >
      <span>{{ item.title }}</span>
      <div class="close">
        <i class="ri-close-line" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const list: any[] = [
  {
    title: '首页'
  },
  {
    title: '用户管理',
    active: true
  },
  {
    title: '菜单管理'
  }
];
</script>
<style lang="scss" scoped>
.tagsViewContainer {
  width: 100%;
  background-color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 6px;
  & > .tag:first-child {
    margin-left: 0;
  }
  & > .tag {
    padding: 0 16px;
    font-size: 13px;
    cursor: pointer;
    color: var(--normal-text-color-black);
    margin: 0 3px;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    border-radius: 2px;
    &.active {
      color: var(--tagsView-active-text-color);
      background-color: var(--tagsView-active-background-color);
      padding: 0 12px;
      & > .close {
        width: 12px;
        margin-left: 6px;
      }
    }
    &:hover {
      color: var(--tagsView-active-text-color);
      background-color: var(--tagsView-active-background-color);
      padding: 0 12px;
      & > .close {
        width: 12px;
        margin-left: 6px;
      }
    }
    & > div.close {
      text-align: center;
      color: #c0c4cc;
      width: 0;
      overflow: hidden;
      border-radius: 50%;
      margin-left: 0px;
      transition: all 0.3s;
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
