<template>
  <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏展示'">
    <div class="navbarFunItem" @click="toggleScreenFull">
      <i v-if="!isFullscreen" class="ri-fullscreen-line" />
      <i v-else class="ri-fullscreen-exit-line" />
    </div>
  </el-tooltip>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';
const isFullscreen = ref<boolean>(false);

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const toggleScreenFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    ElMessage.error('您的浏览器不支持全屏');
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
