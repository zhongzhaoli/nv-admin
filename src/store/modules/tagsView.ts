import { piniaPersistConfig } from '@/utils/persist';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

type TagView = Partial<RouteLocationNormalized>;

interface TagsViewState {
  // route的集合，用于渲染tabs
  visitedViews: TagView[];
  // name的集合，用于keepAlive的include
  cachedViews: string[];
}

type TagsViewStateKey = Array<keyof TagsViewState>;

export const useTagsViewStore = defineStore(
  'tagsView',
  () => {
    const visitedViews = ref<TagView[]>([]);
    const cachedViews = ref<string[]>([]);

    // 添加操作 - 单个
    const addVisitedViews = (view: TagView) => {
      // 如果已经存在，则不再添加，但是需要考虑携带了query参数的情况（文章详情页）
      const index = visitedViews.value.findIndex((v) => v.path === view.path);
      if (index !== -1) {
        // 已存在，处理query参数
        visitedViews.value[index].fullPath !== view.fullPath &&
          (visitedViews.value[index] = { ...view });
      } else {
        // 不存在
        visitedViews.value.push({ ...view });
      }
    };
    const addCachedView = (view: TagView) => {
      if (typeof view.name !== 'string') return;
      if (cachedViews.value.includes(view.name)) return;
      if (view.meta?.keepAlive) cachedViews.value.push(view.name);
    };

    // 删除操作 - 单个
    const delVisitedView = () => {};
    const delCachedView = () => {};

    return { cachedViews, visitedViews, addCachedView, addVisitedViews };
  },
  {
    persist: piniaPersistConfig<TagsViewStateKey>('TAGS_VIEW_STORE', [
      'visitedViews',
      'cachedViews'
    ])
  }
);
