<template>
  <div class="tagsViewContainer">
    <div class="listBox">
      <router-link
        class="tag flex-center"
        v-for="item in tagsViewStore.visitedViews"
        :class="{ active: isActive(item), affix: isAffix(item) }"
        :key="item.path"
        :to="{ path: item.path, query: item.query }"
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
import { onMounted } from 'vue';
const tagsViewStore = useTagsViewStore();
const { addRouteListener } = useRouteListener();
const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();

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
  const res: RouteRecordRaw[] = [];
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
  const affixTags = filterAffixTags(routerStore.handledRoutes);
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
      color: var(--normal-text-color-black);
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
}
</style>
