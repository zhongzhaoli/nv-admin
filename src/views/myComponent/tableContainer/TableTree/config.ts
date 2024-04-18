import { FilterColumnsProp } from '@/components/FilterContainer/types';
import {
  HandleLeftProps,
  TableColumnsProps,
  TableExtraConfigProps
} from '@/components/TableContainer/types';
import { _RouteRecordBase } from 'vue-router';
import { useI18n } from '@/hooks/useI18n';
const { t } = useI18n();

export interface DataProp extends _RouteRecordBase {
  id: number | string;
}

export const filterColumns: FilterColumnsProp[] = [
  {
    label: '菜单标题',
    prop: 'title'
  },
  {
    label: '菜单路径',
    prop: 'path'
  }
];

export const tableColumns: TableColumnsProps[] = [
  {
    label: '菜单标题',
    prop: 'title',
    minWidth: '120',
    align: 'left',
    slot: true
  },
  {
    label: '组件路径/权限标识',
    prop: 'component',
    minWidth: '150',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '菜单类型',
    prop: 'meta.type',
    minWidth: '100',
    align: 'center'
  },
  {
    label: '是否显示',
    align: 'center',
    minWidth: '120',
    prop: 'hidden',
    slot: true
  },
  {
    label: '排序',
    align: 'center',
    width: '70',
    prop: 'meta.sort'
  }
];

export const tableExtraConfig: TableExtraConfigProps = {
  rowKey: 'path',
  expand: true,
  treeProps: { children: 'children', hasChildren: 'hasChildren' }
};

export const leftButtons: HandleLeftProps[] = [
  {
    label: t('msg.create'),
    type: 'primary',
    key: 'create'
  }
];
