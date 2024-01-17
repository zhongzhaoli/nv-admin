import {
  TableColumnsProps,
  HandleLeftProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';

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
    label: '新增',
    type: 'primary',
    click: () => {
      console.log('新增');
    }
  }
];
