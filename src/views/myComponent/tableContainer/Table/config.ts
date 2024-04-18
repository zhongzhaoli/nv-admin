import {
  TableColumnsProps,
  TableExtraColumnsProps
} from '@/components/TableContainer/types';
import { ref } from 'vue';

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
    label: '名称',
    prop: 'name',
    width: '100',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '描述',
    prop: 'description',
    minWidth: '150',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    prop: 'time',
    label: '时间',
    width: '180',
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

export const tableExtraColumns: TableExtraColumnsProps = {
  index: true,
  indexLabel: '序号'
};

export const tableData = ref<any[]>([
  {
    id: 1,
    avatar: 'https://resource.lstaer.com/c5e82a23-558e-4094-a668-a592f2db4f69',
    name: '张三',
    description:
      '张三是一个身材高大的年轻人，面容俊秀，眼中透着坚毅和智慧。他的头发乌黑浓密，微微有些卷曲，总给人一种精神焕发的感觉。',
    status: true,
    time: '2024-04-20 08:12:11'
  },
  {
    id: 2,
    avatar: 'https://resource.lstaer.com/939bb85f-7124-47a5-b894-e42fa76602bd',
    name: '李四',
    description:
      '李四是个沉稳低调的人，气质内敛。他的眼神深邃，透露出一种沉着和冷静。行动中透露出的稳健和坚韧，让人感受到他的可靠和值得信赖。',
    status: false,
    time: '2024-04-20 08:12:11'
  },
  {
    id: 3,
    avatar: 'https://resource.lstaer.com/939bb85f-7124-47a5-b894-e42fa76602bd',
    name: '王五',
    description: '王五是个活泼开朗的年轻人。',
    status: true,
    time: '2024-04-20 08:12:11'
  }
]);
