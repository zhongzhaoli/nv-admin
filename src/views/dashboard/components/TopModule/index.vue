<template>
  <el-row :gutter="normalPadding">
    <el-col
      :xl="6"
      :lg="6"
      :md="12"
      :sm="12"
      :xs="12"
      v-for="(item, index) in listData"
      :key="index"
    >
      <DataCard
        class="dataCardComponent"
        :title="item.title"
        :actionTagText="item.actionTagText"
        :actionTagType="item.actionTagType"
        :svg="item.svg"
        :count="item.count"
        :prefix="item.prefix"
        :totalCount="item.totalCount"
        :unit="item.unit"
      />
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import DataCard, { type DataCardProps } from '../DataCard/index.vue';
import VisitSvg from '@/assets/svg/visit.svg';
import UserSvg from '@/assets/svg/user.svg';
import OrderSvg from '@/assets/svg/order.svg';
import BalanceSvg from '@/assets/svg/balance.svg';
import { getCssVariableValue } from '@/utils/css';

let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));

const listData: DataCardProps[] = [
  {
    title: '访问量',
    actionTagText: '日',
    actionTagType: 'success',
    svg: VisitSvg,
    count: 37821,
    totalCount: 3891273,
    unit: '次'
  },
  {
    title: '订单量',
    actionTagText: '周',
    actionTagType: 'warning',
    svg: OrderSvg,
    count: 1102,
    totalCount: 95838,
    unit: '单'
  },
  {
    title: '用户量',
    actionTagText: '年',
    actionTagType: 'danger',
    svg: UserSvg,
    count: 3983,
    totalCount: 382929,
    unit: '人'
  },
  {
    title: '成交额',
    actionTagText: '月',
    actionTagType: '',
    svg: BalanceSvg,
    count: 943881,
    totalCount: 32189321,
    prefix: '¥',
    unit: '元'
  }
];
</script>
<style lang="scss" scoped></style>
