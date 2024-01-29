import { cloneDeep } from 'lodash-es';
import { ref, unref } from 'vue';

export interface SelectTargetInstance {
  openDialog: () => void;
  closeDialog: () => void;
}

export function useSelectTarget(emits: any) {
  const selectList = ref<any[]>([]);
  const closedVisible = ref<boolean>(false);
  const cVisible = ref<boolean>(false);

  const closed = () => {
    emits('closed');
    closedVisible.value = true;
  };

  const close = () => {
    emits('close');
  };

  const selectChange = (list: any[]) => {
    selectList.value = list;
  };

  // 确认
  const submitFun = () => {
    emits('submit', cloneDeep(unref(selectList)));
  };

  const openDialog = () => {
    cVisible.value = true;
    closedVisible.value = false;
  };

  const closeDialog = () => {
    cVisible.value = false;
  };

  return {
    closed,
    close,
    selectChange,
    submitFun,
    openDialog,
    cVisible,
    closedVisible,
    closeDialog
  };
}
