import { ACCESS_TYPE } from '@/constants/accessTarget';
import { cloneDeep } from 'lodash-es';
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

export function useAccessTarget(emits: any, type: ACCESS_TYPE) {
  const accessType = ref<ACCESS_TYPE>(type);

  // 选择用户/部门
  const uVisible = ref<boolean>(false);
  const dVisible = ref<boolean>(false);

  const drawerVisible = ref<boolean>(false);

  const selectListObject = ref<SelectListObject>({
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
  });

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
      } else {
        obj.departmentList = list;
        obj.departmentNameString = getNameList(list, 'name');
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
    emits('update:modelValue', false);
    emits('submit', type, obj);
  };

  return {
    accessType,
    uVisible,
    dVisible,
    selectListObject,
    drawerVisible,
    submitFun,
    defaultSelectSet,
    getNameList,
    submit
  };
}
