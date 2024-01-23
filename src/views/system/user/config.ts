import {
  TableColumnsProps,
  HandleLeftProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';
import {
  FilterColumnsProp,
  FilterSelectOptionsProp
} from '@/components/FilterContainer/types';
import { useI18n } from '@/hooks/useI18n';
const { t } = useI18n();

export interface DataProp {
  id: string;
  avatar: string;
  createTime: string;
  phone: string;
  realName: string;
  role: string;
  status: 1 | 2;
  updateTime: string;
  username: string;
}

export const tableColumns: TableColumnsProps[] = [
  {
    label: '头像',
    prop: 'avatar',
    width: '70',
    slot: true,
    align: 'center'
  },
  {
    label: '用户名',
    prop: 'username',
    align: 'center',
    width: '180',
    showOverflowTooltip: true
  },
  {
    prop: 'phone',
    label: '手机号',
    width: '180',
    align: 'center'
  },
  {
    label: '角色',
    prop: 'role',
    align: 'center',
    showOverflowTooltip: true,
    minWidth: '200'
  },
  {
    label: '状态',
    prop: 'status',
    slot: true,
    width: '120',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建日期',
    width: '180',
    align: 'center'
  },
  {
    prop: 'updateTime',
    label: '更新日期',
    width: '180',
    align: 'center'
  },
  {
    prop: 'action',
    label: '操作',
    width: '180',
    slot: true,
    fixed: 'right',
    align: 'center'
  }
];

export const tableExtraColumns: TableExtraColumnsProps = {
  index: true
};

export const leftButtons: HandleLeftProps[] = [
  {
    label: t('msg.create'),
    type: 'primary',
    key: 'create'
  }
];

export const userStatus: FilterSelectOptionsProp[] = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  }
];

export const filterColumns: FilterColumnsProp[] = [
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    selectOptions: userStatus
  }
];
