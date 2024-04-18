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
    width: '220',
    slot: true,
    fixed: 'right',
    align: 'center'
  }
];

export const filterColumns: FilterColumnsProp[] = [
  {
    label: '角色名',
    prop: 'name'
  }
];

export const tableExtraColumns: TableExtraColumnsProps = {
  index: true,
  indexLabel: '#'
};

export const leftButtons: HandleLeftProps[] = [
  {
    label: t('msg.create'),
    type: 'primary',
    key: 'create'
  }
];
