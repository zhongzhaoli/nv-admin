import { FilterColumnsProp } from '@/components/FilterContainer/types';
import {
  HandleLeftProps,
  TableColumnsProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';
import { useI18n } from '@/hooks/useI18n';
const { t } = useI18n();

export interface DataProp {
  id: string;
  name: string;
  description: string;
  createUser: string;
  memberCount: number;
  avatar: string;
  status: string;
  createTime: string;
  updateTime: string;
}

export const tableColumns: TableColumnsProps[] = [
  {
    label: '封面图',
    prop: 'avatar',
    width: '80',
    slot: true,
    align: 'center'
  },
  {
    label: '部门名称',
    prop: 'name',
    width: '200',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '成员数量',
    prop: 'memberCount',
    width: '150',
    align: 'center'
  },
  {
    label: '描述',
    prop: 'description',
    minWidth: '150',
    align: 'center',
    showOverflowTooltip: true
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
    prop: 'createUser.realName',
    label: '创建人',
    width: '100',
    align: 'center'
  },
  {
    prop: 'action',
    label: '操作',
    width: '190',
    slot: true,
    fixed: 'right',
    align: 'center'
  }
];

export const filterColumns: FilterColumnsProp[] = [
  {
    label: '部门名称',
    prop: 'name'
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
