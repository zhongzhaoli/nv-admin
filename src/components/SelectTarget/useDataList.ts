import { PAGE } from '@/constants/app';
import { ref, unref } from 'vue';

export function useDataList(emits: any, defaultSelectList: any[]) {
  const currentPage = ref<number>(PAGE);
  const pageSize = ref<number>(15);
  const total = ref(0);
  const loading = ref<boolean>(true);
  const list = ref<any[]>([]);
  const loadingMore = ref<boolean>(false);
  const nameKey = ref<string>('username');
  const avatarShape = ref<'square' | 'circle'>('square');
  const api = ref<Function | null>(null);
  const searchKey = ref<string>('');

  // 获户列表
  const getListFun = async (load: boolean = false) => {
    if (load) {
      loadingMore.value = true;
    } else {
      loading.value = true;
    }
    try {
      if (api.value) {
        const params: { [name: string]: any } = {
          page: unref(currentPage),
          pageSize: unref(pageSize)
        };
        if (unref(searchKey)) params[unref(nameKey)] = unref(searchKey);
        const { data } = await api.value(params);
        currentPage.value = data.page;
        const newList = data.list.map((item: any) => {
          let checked: boolean = false;
          if (defaultSelectList.length) {
            const index = defaultSelectList.findIndex((v) => v.id === item.id);
            if (index > -1) {
              checked = true;
            } else {
              checked = false;
            }
          }
          return {
            ...item,
            checked
          };
        });
        list.value = [...list.value, ...newList];
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
    nameKey,
    avatarShape,
    list,
    loadingMore,
    loading,
    api,
    searchKey
  };
}
