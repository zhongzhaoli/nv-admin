import { PAGE } from '@/constants/app';
import { ref, unref } from 'vue';

export function useDataList(emits: any) {
  const currentPage = ref<number>(PAGE);
  const pageSize = ref<number>(15);
  const total = ref(0);
  const loading = ref<boolean>(true);
  const list = ref<any[]>([]);
  const loadingMore = ref<boolean>(false);
  const avatarShape = ref<'square' | 'circle'>('square');
  const uApi = ref<Function | null>(null);
  const uNameKey = ref<string>('');
  const searchKey = ref<string>('');
  const defaultList = ref<any[]>([]);

  // 获户列表
  const getListFun = async (load: boolean = false) => {
    if (load) {
      loadingMore.value = true;
    } else {
      loading.value = true;
    }
    try {
      if (uApi.value) {
        const params: { [name: string]: any } = {
          page: unref(currentPage),
          pageSize: unref(pageSize)
        };
        if (unref(searchKey)) params[unref(uNameKey)] = unref(searchKey);
        const { data } = await uApi.value(params);
        currentPage.value = data.page;
        const newList = data.list.map((item: any) => {
          return {
            ...item,
            checked: false
          };
        });
        list.value = [...list.value, ...handleDefaultSelect(newList)];
        total.value = data.total;
      }
      if (unref(list).length < unref(total)) {
        loadingMore.value = true;
      } else {
        loadingMore.value = false;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // 处理回显
  const handleDefaultSelect = (cList: any[] = list.value): any[] => {
    if (unref(defaultList) && unref(defaultList).length) {
      return cList.map((item: any) => {
        let checked: boolean = false;
        const index = unref(defaultList).findIndex((v) => v.id === item.id);
        if (index > -1) {
          checked = true;
        } else {
          checked = false;
        }
        return {
          ...item,
          checked
        };
      });
    } else {
      return cList;
    }
  };

  // 加载更多
  const loadMore = () => {
    if (unref(list).length < unref(total)) {
      currentPage.value++;
      getListFun(true);
    }
  };

  // 选中
  const clickItem = (item: any) => {
    item.checked = !item.checked;
    checkBoxChange();
  };

  // 选中checkBox
  const checkBoxChange = () => {
    const newList = unref(list).filter((item) => item.checked);
    emits('change', newList);
  };

  // 搜索
  const searchFun = () => {
    currentPage.value = 1;
    list.value = [];
    getListFun();
  };
  return {
    checkBoxChange,
    loadMore,
    getListFun,
    clickItem,
    searchFun,
    handleDefaultSelect,
    uNameKey,
    avatarShape,
    list,
    loadingMore,
    loading,
    uApi,
    searchKey,
    defaultList
  };
}
