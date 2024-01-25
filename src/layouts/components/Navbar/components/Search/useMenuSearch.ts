import { RouteRecordRaw } from 'vue-router';
import { resolve } from 'path-browserify';
import { Ref, computed, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { onKeyStroke } from '@vueuse/core';
import { useRouterStore } from '@/store/modules/router';
export interface ListProps {
  icon?: string;
  title: string;
}
export interface ItemProps {
  list: ListProps[];
  path: string;
  active: boolean;
}
export function useMenuSearch(
  itemRefs: Ref<HTMLElement[] | null>,
  scrollWrap: Ref<HTMLElement | null>,
  emits: Function
) {
  const resultList = ref<ItemProps[]>([]);
  const searchWord = ref<string>('');
  const router = useRouter();
  const routerStore = useRouterStore();

  // 搜索
  const searchReslt = (
    keyWord: string,
    arr: RouteRecordRaw[],
    list: ListProps[] | null = null,
    parent?: RouteRecordRaw
  ) => {
    let result: ItemProps[] = [];
    arr.forEach((item) => {
      const { path, meta, children } = item;
      const newPath = resolve(parent?.path || '', path);
      let newList: ListProps[] = [];
      let parentHave: boolean = false;
      if (meta && meta.title && !meta.hidden) {
        newList = list
          ? [...list, { title: meta.title, icon: (meta.icon || '') as string }]
          : [{ title: meta.title, icon: (meta.icon || '') as string }];
        if (meta.title.includes(keyWord)) {
          parentHave = true;
          result.push({
            path: newPath,
            list: newList,
            active: false
          });
        }
      }
      if (children && children.length) {
        const childResult = searchReslt(keyWord, children, newList, item);
        if (childResult && childResult.length) {
          if (parentHave) {
            result.pop();
          }
          result = [...result, ...childResult];
        }
      }
    });
    return result;
  };
  // 向上选中
  const handleUp = () => {
    if (!resultList.value.length) return;
    activeIndex.value--;
    if (activeIndex.value < 0) {
      activeIndex.value = resultList.value.length - 1;
    }
    handleScroll();
  };

  // 向下选中
  const handleDown = () => {
    if (!resultList.value.length) return;
    activeIndex.value++;
    if (activeIndex.value > resultList.value.length - 1) {
      activeIndex.value = 0;
    }
    handleScroll();
  };

  // 滚动条滚动
  const handleScroll = () => {
    const refList = unref(itemRefs);
    if (
      !refList ||
      !Array.isArray(refList) ||
      refList.length === 0 ||
      !unref(scrollWrap)
    ) {
      return;
    }

    const index = unref(activeIndex);
    const currentRef = refList[index];
    if (!currentRef) {
      return;
    }
    const wrapEl = unref(scrollWrap);
    if (!wrapEl) {
      return;
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight;
    const wrapHeight = wrapEl.offsetHeight;
    wrapEl.scrollTop = scrollHeight - wrapHeight;
  };

  // 鼠标移入
  const mouseEnter = (index: number) => {
    activeIndex.value = index;
  };

  // 选中
  const activeIndex = ref<number>(-1);

  // 搜索
  const handledRoutes = computed(() => routerStore.handledRoutes);
  const searchHandle = () => {
    if (!unref(searchWord)) {
      resultList.value = [];
      activeIndex.value = -1;
      return;
    }
    resultList.value = searchReslt(unref(searchWord), unref(handledRoutes));
    activeIndex.value = 0;
  };

  // 关闭搜索
  const handleClose = () => {
    emits('close');
    activeIndex.value = -1;
    searchWord.value = '';
    resultList.value = [];
  };

  // 回车跳转
  const handleEnter = () => {
    if (!resultList.value.length) return;
    const item = resultList.value[activeIndex.value];
    if (item && item.path) {
      router.push(item.path);
      handleClose();
    }
  };

  // 键盘监听
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
  onKeyStroke('Enter', handleEnter);
  onKeyStroke('Escape', handleClose);
  return {
    searchReslt,
    resultList,
    searchWord,
    handleUp,
    handleDown,
    mouseEnter,
    searchHandle,
    activeIndex,
    handleEnter,
    handleClose
  };
}
