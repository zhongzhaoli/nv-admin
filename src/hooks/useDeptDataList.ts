import { onMounted, ref } from 'vue';
import { getAllDeptList } from '@/api/department/index';
import { DataProp } from '@/views/system/department/config';

export function useDeptDataList(useCompany?: boolean) {
  const deptList = ref<DataProp[]>([]);
  const loading = ref<boolean>(false);

  const getList = async () => {
    loading.value = true;
    const { data } = await getAllDeptList<DataProp[]>();
    loading.value = false;
    const list = ref<DataProp[]>([]);
    if (useCompany) {
      const company = ref<DataProp>({
        name: import.meta.env.VITE_APP_COMPANY_NAME,
        id: '0',
        children: data
      } as unknown as DataProp);
      list.value.push(company.value);
    } else {
      list.value = data as DataProp[];
    }
    deptList.value = list.value;
  };
  const refresh = () => {
    getList();
  };

  onMounted(() => {
    getList();
  });

  return {
    deptList,
    loading,
    refresh
  };
}
