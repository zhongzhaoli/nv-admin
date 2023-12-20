<template>
  <Card title="最新通知">
    <template #action>
      <el-button type="primary" link>查看更多</el-button>
    </template>
    <template #default>
      <div class="cardBody">
        <div class="listBox">
          <Item
            class="item"
            v-for="(item, index) in activities"
            :key="index"
            :notice="item"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import Item, { type Notice } from './item.vue';
const activities: Notice[] = [
  {
    avatar: 'https://resource.lstaer.com/1f967c66-5966-496d-beca-25b58622632a',
    author: '行政-张三',
    title: '元旦放假',
    timestamp: '1秒前'
  },
  {
    avatar: 'https://resource.lstaer.com/1f9ce64a-81dc-4147-beca-f7a72861b647',
    author: '副总监',
    title: '全体员工工资上调',
    timestamp: '38分钟前'
  },
  {
    avatar: 'https://resource.lstaer.com/2057c545-31e2-48d4-b3f7-fb80602ffab1',
    author: '人事部-李四',
    title: '销售部李婷同事被处罚',
    timestamp: '2小时前'
  },
  {
    avatar: 'https://resource.lstaer.com/2343860f-a3f5-45a1-935d-43d6b9dbcaef',
    author: '财务部-王五',
    title: '年终奖发放',
    timestamp: '18小时前'
  },
  {
    avatar: 'https://resource.lstaer.com/242677b6-7a44-4926-9327-8121acd5af0f',
    author: '技术部-赵六',
    title: '系统升级',
    timestamp: '2023-12-20'
  },
  {
    avatar: 'https://resource.lstaer.com/26238892-aebf-41ef-ac9c-eac4119b7044',
    author: '客服部-孙七',
    title: '服务流程调整',
    timestamp: '2023-12-18'
  },
  {
    avatar: 'https://resource.lstaer.com/26541b3c-a630-4014-ae0d-67a59624e56d',
    author: '市场部-周八',
    title: '年度营销计划',
    timestamp: '2023-12-02'
  }
];
</script>
<style lang="scss" scoped>
.cardBody {
  padding: 24px 40px;
  & > .listBox {
    & > .item:not(:last-child) {
      border-bottom: 1px #f0f0f0 solid;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
  }
}
</style>
