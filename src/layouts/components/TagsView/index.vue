<template>
  <div class="tagsViewContainer">
    <div class="listBox">
      <router-link
        class="tag flex-center"
        v-for="item in tagsViewStore.visitedViews"
        :class="{ active: isActive(item), affix: isAffix(item) }"
        :key="item.path"
        :to="{ path: item.path, query: item.query }"
        @contextmenu.prevent="openMenu(item, $event)"
      >
        <span>{{ item.meta?.title }}</span>
        <div
          class="close"
          @click.prevent.stop="closeTag(item)"
          v-if="!isAffix(item)"
        >
          <i class="ri-close-line" />
        </div>
      </router-link>
    </div>
    <ul
      v-show="visible"
      class="contextmenu"
      :style="{ left: menuPosition.left + 'px', top: menuPosition.top + 'px' }"
    >
      <li v-if="!isAffix(selectedTag)" @click="closeTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useTagsViewStore, type TagView } from '@/store/modules/tagsView';
import { useRouteListener } from '@/hooks/useRouteListener';
import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw
} from 'vue-router';
import { useRouterStore } from '@/store/modules/router';
import { onMounted, ref, getCurrentInstance, watch } from 'vue';
const tagsViewStore = useTagsViewStore();
const { addRouteListener } = useRouteListener();
const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

// 固定在TagsView上的菜单集合
let affixTags: TagView[] = [];

// 右键菜单一些参数
const instance = getCurrentInstance();
const menuPosition = ref<{ left: number; top: number }>({
  left: 0,
  top: 0
});
const visible = ref<boolean>(false);
const selectedTag = ref<TagView>({});

// 打开右键菜单
const openMenu = (tag: TagView, e: MouseEvent) => {
  // 当前组件宽度
  const offsetWidth = instance!.proxy!.$el.offsetWidth;
  // 面板距离鼠标指针的距离
  const left15 = e.clientX + 15;
  // 超过最边界，就显示在最边界
  menuPosition.value.left = left15 > offsetWidth ? offsetWidth : left15;
  menuPosition.value.top = e.clientY;
  // 显示面板
  visible.value = true;
  // 更新当前正在右键操作的标签页
  selectedTag.value = tag;
};

// 关闭右键菜单
const closeMenu = () => {
  visible.value = false;
};

// 关闭其他Tags
const closeOthersTags = () => {
  tagsViewStore.delOthersVisitedView(selectedTag.value);
  tagsViewStore.delOthersCachedView(selectedTag.value);
  // 如果右键关闭其他的不是当前页面，则跳到右键的页面
  const selectedPath = selectedTag.value.path;
  if (selectedPath !== route.path && selectedPath !== undefined)
    router.push(selectedPath);
};

// 关闭所有Tags
const closeAllTags = () => {
  tagsViewStore.delAllVisitedView();
  tagsViewStore.delAllCachedView();
  // 如果当前在固定的tag上，那就不会跳转到最后一个页面，否则就跳转
  if (affixTags.some((tag) => tag.path === route.path)) return;
  toLastView(tagsViewStore.visitedViews);
};

watch(visible, (value) => {
  value
    ? document.body.addEventListener('click', closeMenu)
    : document.body.removeEventListener('click', closeMenu);
});

// 路由有变化，添加tag在tagsView上
const addTags = (route: RouteLocationNormalizedLoaded) => {
  tagsViewStore.addVisitedViews(route);
  tagsViewStore.addCachedView(route);
};

// 判断是否当前路由
const isActive = (view: TagView) => {
  return view.path === route.path;
};

// 是否固定在tagsView上
const isAffix = (view: TagView) => {
  return view.meta && view.meta.affix;
};

// 关闭单个tag
const closeTag = (view: TagView) => {
  tagsViewStore.delVisitedView(view);
  tagsViewStore.delCachedView(view);
  isActive(view) && toLastView(tagsViewStore.visitedViews);
};

// 跳转到最后一个页面
const toLastView = (visitedViews: TagView[]) => {
  // 没有页面了，跳转到首页
  if (visitedViews.length === 0) return router.push('/');
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.path)
    return router.push({ path: latestView.path, query: latestView.query });
};

// 筛选出固定在tagsView上的tag
const filterAffixTags = (routes: RouteRecordRaw[]) => {
  const res: TagView[] = [];
  routes.forEach((route) => {
    if (isAffix(route)) {
      res.push(route);
    }
    if (route.children && route.children.length > 0) {
      res.push(...filterAffixTags(route.children));
    }
  });
  return res;
};

// 初始化，将固定在tagsView上的tag添加到visitedViews中
const init = () => {
  affixTags = filterAffixTags(routerStore.handledRoutes);
  for (let route of affixTags) {
    route.meta && route.meta.title && tagsViewStore.addVisitedViews(route);
  }
};

// 监听路由变化
onMounted(() => {
  init();
  addRouteListener((route) => {
    addTags(route);
  }, true);
});
</script>
<style lang="scss" scoped>
.activeTag {
  color: var(--tagsView-active-text-color);
  background-color: var(--tagsView-active-background-color);
  & > span {
    transform: translateX(0px);
  }
  & > div.close {
    transform: translateX(0px);
    opacity: 1;
  }
}

.tagsViewContainer {
  width: 100%;
  background-color: #fff;
  height: 100%;
  padding: 6px;
  & > .listBox {
    display: flex;
    height: 100%;
    align-items: center;
    & > .tag:first-child {
      margin-left: 0;
    }
    & > .tag {
      text-decoration: none;
      padding: 0 14px;
      font-size: 13px;
      cursor: pointer;
      color: var(--el-text-color-regular);
      margin: 0 3px;
      height: 100%;
      transition: all 0.3s;
      border-radius: 2px;
      & > span {
        transition: transform 0.3s;
        transform: translateX(9px);
      }
      &.affix {
        & > span {
          transform: translateX(0px);
        }
      }
      &.active {
        @extend .activeTag;
      }
      &:hover {
        @extend .activeTag;
      }
      & > div.close {
        text-align: center;
        color: #c0c4cc;
        width: 12px;
        overflow: hidden;
        border-radius: 50%;
        transition: all 0.3s;
        transform: translateX(9px);
        margin-left: 6px;
        opacity: 0;
        &:hover {
          color: #999;
        }
      }
    }
  }
  & > .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
