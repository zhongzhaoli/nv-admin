<template>
  <a-tooltip>
    <template #title>{{ isFullscreen ? '退出全屏' : '全屏展示' }}</template>
    <div class="navbarFunItem" @click="toggleScreenFull">
      <i v-if="!isFullscreen" class="ri-fullscreen-line" />
      <i v-else class="ri-fullscreen-exit-line" />
    </div>
  </a-tooltip>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { message } from 'ant-design-vue';
import screenfull from 'screenfull';
const isFullscreen = ref<boolean>(false);

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const toggleScreenFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    message.error('您的浏览器不支持全屏');
  }
};
onMounted(() => {
  screenfull.on('change', change);
});
onUnmounted(() => {
  screenfull.off('change', change);
});
</script>
<style lang="scss" scoped></style>
