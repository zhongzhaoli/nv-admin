import {
  FilterColumnsProp,
  FilterSelectOptionsProp
} from '@/components/FilterContainer/types';
import {
  HandleLeftProps,
  TableColumnsProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';

export interface DataProp {
  id: string;
  name: string;
  description: string;
  status: string;
  createTime: string;
  updateTime: string;
}

export const tableColumns: TableColumnsProps[] = [
  {
    label: '角色名',
    prop: 'name',
    minWidth: '120',
    align: 'center'
  },
  {
    label: '状态',
    prop: 'status',
    slot: true,
    width: '120',
    align: 'center'
  },
  {
    label: '备注',
    prop: 'description',
    minWidth: '140',
    showOverflowTooltip: true,
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

export const roleStatus: FilterSelectOptionsProp[] = [
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
    label: '角色名',
    prop: 'name'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    selectOptions: roleStatus
  }
];

export const tableExtraColumns: TableExtraColumnsProps = {
  selection: true
};

export const leftButtons: HandleLeftProps[] = [
  {
    label: '新增',
    type: 'primary',
    key: 'create'
  },
  {
    label: '删除',
    type: 'danger',
    key: 'delete'
  }
];
