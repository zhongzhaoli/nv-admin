import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

export type TagView = Partial<RouteLocationNormalized>;

export const useTagsViewStore = defineStore('tagsView', () => {
  // route的集合，用于渲染tabs
  const visitedViews = ref<TagView[]>([]);
  // name的集合，用于keepAlive的include
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
  const delVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path);
    if (index !== -1) visitedViews.value.splice(index, 1);
  };
  const delCachedView = (view: TagView) => {
    if (typeof view.name !== 'string') return;
    const index = cachedViews.value.indexOf(view.name);
    if (index !== -1) cachedViews.value.splice(index, 1);
  };

  return {
    cachedViews,
    visitedViews,
    addCachedView,
    addVisitedViews,
    delVisitedView,
    delCachedView
  };
});
