<template>
  <div class="scrollPane">
    <div class="scrollButton arrowLeft" @click="scrollTo('left')">
      <i class="ri-arrow-left-s-line" />
    </div>
    <el-scrollbar ref="scrollbarRef" @scroll="scroll">
      <div class="scrollView" ref="scrollbarContentRef">
        <slot />
      </div>
    </el-scrollbar>
    <div class="scrollButton arrowRight" @click="scrollTo('right')">
      <i class="ri-arrow-right-s-line" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
import { ref, nextTick } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useRouteListener } from '@/hooks/useRouteListener';

interface Props {
  tagRefs: InstanceType<typeof RouterLink>[];
}

const props = defineProps<Props>();

// 每次滚动距离
const translateDistance = 200;
// 当前滚动条位置
let currentScrollLeft = 0;
// 滚动条ref
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
// 内容区ref
const scrollbarContentRef = ref<HTMLElement>();

// scorll滚动事件
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  // 记录滚动条位置
  currentScrollLeft = scrollLeft;
};

// 一些宽度数据
const getWidth = () => {
  // 内容总宽度
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth;
  // 可视区域宽度
  const scrollbarRefWidth = scrollbarRef.value!.wrapRef!.clientWidth;
  // 最大可移动宽度
  const lastDistance =
    scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft;

  return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance };
};

// 左右滚动事件
const scrollTo = (
  direction: 'left' | 'right',
  distance: number = translateDistance
) => {
  const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } =
    getWidth();
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth >= scrollbarContentRefWidth) return;
  let scrollLeft = 0;
  if (direction === 'left') {
    // 取最大值
    scrollLeft = Math.max(0, currentScrollLeft - distance);
  } else {
    // 取最小值
    scrollLeft = Math.min(
      currentScrollLeft + distance,
      currentScrollLeft + lastDistance
    );
  }
  scrollbarRef.value!.setScrollLeft(scrollLeft);
};

// 移动到当前激活的标签页
const route = useRoute();
const moveTo = () => {
  const tagRefs = props.tagRefs;
  for (let i = 0; i < tagRefs.length; i++) {
    // 找到当前标签页
    // @ts-ignore
    if (tagRefs[i].$props.to.path === route.path) {
      // 查找当前标签页的位置
      // @ts-ignore
      const el: HTMLElement = tagRefs[i].$el;
      const offsetWidth = el.offsetWidth;
      const offsetLeft = el.offsetLeft;
      const { scrollbarRefWidth } = getWidth();
      // 当前 tag 在可视区域左边时
      if (offsetLeft < currentScrollLeft) {
        // 算出差值，并移动
        const distance = currentScrollLeft - offsetLeft;
        scrollTo('left', distance);
        return;
      }
      // 当前 tag 在可视区域右边时
      const width = scrollbarRefWidth + currentScrollLeft - offsetWidth;
      if (offsetLeft > width) {
        // 算出差值，并移动
        const distance = offsetLeft - width;
        scrollTo('right', distance);
        return;
      }
    }
  }
};

// 监听Route变化
const { addRouteListener } = useRouteListener();
addRouteListener(() => {
  // 避免元素还未创建完成，所以延迟执行
  nextTick(() => {
    moveTo();
  });
});
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.scrollPane {
  height: 100%;
  display: flex;
  justify-content: space-between;
  & > .el-scrollbar {
    flex: 1;
    margin: 0 6px;
  }
  & > .scrollButton {
    width: calc(var(--tagsView-height) - 12px);
    @extend .flex-center;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 4px;
    height: calc(var(--tagsView-height) - 12px);
    margin-top: 6px;
    &.arrowLeft {
      margin-left: 6px;
    }
    &.arrowRight {
      margin-right: 6px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
:deep(.el-scrollbar__view) {
  height: 100%;
}
:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0px;
}
.scrollView {
  height: 100%;
  display: inline-flex;
  white-space: nowrap;
}
</style>
