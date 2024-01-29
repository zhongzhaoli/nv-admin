import { ACCESS_TYPE } from '@/constants/accessTarget';
import { cloneDeep } from 'lodash-es';
import { type SelectTargetInstance } from '@/components/SelectTarget/useSelectTarget';
import { ref, unref } from 'vue';

export interface SelectListObjectProp {
  userList: any[];
  userNameString: string;
  departmentList: any[];
  departmentNameString: string;
}
export interface SelectListObject {
  can: SelectListObjectProp;
  cant: SelectListObjectProp;
}

const initSelectListObject: SelectListObject = {
  can: {
    userList: [],
    userNameString: '',
    departmentList: [],
    departmentNameString: ''
  },
  cant: {
    userList: [],
    userNameString: '',
    departmentList: [],
    departmentNameString: ''
  }
};

export function useAccessTarget(emits: any, type: ACCESS_TYPE) {
  const accessType = ref<ACCESS_TYPE>(type);

  // 选择用户/部门
  const selectUserRef = ref<SelectTargetInstance | null>(null);
  const selectDeptRef = ref<SelectTargetInstance | null>(null);

  const drawerVisible = ref<boolean>(false);
  const selectListObject = ref<SelectListObject>(
    cloneDeep(initSelectListObject)
  );

  // 重置化选中数据
  const initSelectListFun = () => {
    selectListObject.value = cloneDeep(initSelectListObject);
  };

  // 默认值赋值
  const defaultSelectSet = (defaultSelectList: SelectListObjectProp) => {
    if (accessType.value !== 'all') {
      selectListObject.value[accessType.value] = defaultSelectList;
    }
  };

  // 确认回调
  const submitFun = (list: any[], type: string) => {
    if (accessType.value !== 'all') {
      const obj = selectListObject.value[accessType.value];
      if (type === 'User') {
        obj.userList = list;
        obj.userNameString = getNameList(list, 'username');
        selectUserRef.value && selectUserRef.value.closeDialog();
      } else {
        obj.departmentList = list;
        obj.departmentNameString = getNameList(list, 'name');
        selectDeptRef.value && selectDeptRef.value.closeDialog();
      }
    }
  };

  // 生成名字列表
  const getNameList = (list: any[], name: string) => {
    return list.map((item) => item[name]).join('，');
  };

  // 保存
  const submit = () => {
    let obj: SelectListObjectProp | null = null;
    const type = unref(accessType);
    if (type === 'can') {
      obj = cloneDeep(selectListObject.value.can);
    } else if (type === 'cant') {
      obj = cloneDeep(selectListObject.value.cant);
    }
    emits('submit', type, obj);
    closeDrawer();
  };

  // 关闭之后
  const closed = () => {
    initSelectListFun();
    emits('closed');
  };

  // 关闭
  const close = () => {
    emits('close');
  };

  // 打开抽屉
  const openDrawer = () => {
    drawerVisible.value = true;
  };

  // 关闭抽屉
  const closeDrawer = () => {
    drawerVisible.value = false;
  };

  // 打开UserDialog
  const openUserDialog = () => {
    selectUserRef.value && selectUserRef.value.openDialog();
  };

  // 打开DeptDialog
  const openDeptDialog = () => {
    selectDeptRef.value && selectDeptRef.value.openDialog();
  };

  return {
    selectUserRef,
    selectDeptRef,
    accessType,
    selectListObject,
    drawerVisible,
    closeDrawer,
    submitFun,
    defaultSelectSet,
    initSelectListFun,
    getNameList,
    submit,
    closed,
    close,
    openDrawer,
    openUserDialog,
    openDeptDialog
  };
}
