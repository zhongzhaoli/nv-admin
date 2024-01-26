<template>
  <div class="selectTargetScrollComponent">
    <ul
      v-infinite-scroll="load"
      class="list"
      :infinite-scroll-disabled="disabled"
    >
      <slot />
    </ul>
    <div class="loadingContainer flex-center" v-if="loadingMore">
      <div class="loading-circle" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface ComponentProps {
  loadingMore: boolean;
  disabled: boolean;
}

defineProps<ComponentProps>();
const emits = defineEmits(['load']);

const load = () => {
  emits('load');
};
</script>
<style lang="scss" scoped>
.selectTargetScrollComponent {
  height: 400px;
  overflow: auto;
  & > ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .loadingContainer {
    width: 100%;
    height: 50px;
    & > .loading-circle {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }
  }
}
</style>
