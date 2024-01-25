<template>
  <div
    class="searchItemComponent"
    :class="{ active: active }"
    @mouseenter="mouseEnter"
  >
    <div class="textBox">
      <div v-for="(v, index) in item.list" :key="index">
        <i class="icon" v-if="v.icon" :class="v.icon" />
        <div class="title">{{ v.title }}</div>
        <div class="right" v-if="index < item.list.length - 1">
          <i class="ri-arrow-right-s-line" />
        </div>
      </div>
    </div>
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8"
        />
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ItemProps } from './useMenuSearch';

interface ComponentProps {
  item: ItemProps;
  index: number;
  active: boolean;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['mouseEnter']);

const mouseEnter = () => {
  emits('mouseEnter', props.index);
};
</script>
<style lang="scss" scoped>
.searchItemComponent {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 56px;
  margin-top: 8px;
  padding: 0 14px;
  border-radius: 4px;
  background-color: var(--component-background-color);
  box-shadow: 0 1px 3px #d4d9e1;
  font-size: 14px;
  cursor: pointer;
  &.active {
    background-color: #0960bd;
    color: #fff;
    & > .textBox {
      & > div {
        color: #fff;
      }
    }
  }
  & > .textBox {
    flex: 1;
    display: flex;
    align-items: center;
    & > div {
      display: flex;
      align-items: center;
      color: rgba(0 0 0 / 85%);

      & > .icon {
        font-size: 20px;
        margin-right: 10px;
      }
      & > .title {
        font-size: 16px;
      }
      & > .right {
        margin: 0 10px;
        margin-top: 2px;
        & > i {
          font-size: 20px;
        }
      }
    }
  }
  & > .icon {
    width: 22px;
    height: 22px;
    margin-top: -4px;
    & > img {
      width: 100%;
      height: 100%;
      vertical-align: super;
    }
  }
}
</style>
