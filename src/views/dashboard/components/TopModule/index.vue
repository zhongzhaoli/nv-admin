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
        v-loading="loading"
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
import { ref, watch } from 'vue';

interface ComponentProps {
  loading: boolean;
  data: {
    vN: number;
    vTN: number;
    oN: number;
    oTN: number;
    uN: number;
    uTn: number;
    pN: number;
    pTN: number;
  };
}

const props = defineProps<ComponentProps>();

watch(
  () => props.data,
  (nV) => {
    listData.value = [
      {
        title: '访问量',
        actionTagText: '日',
        actionTagType: 'success',
        svg: VisitSvg,
        count: nV.vN,
        totalCount: nV.vTN,
        unit: '次'
      },
      {
        title: '订单量',
        actionTagText: '周',
        actionTagType: 'warning',
        svg: OrderSvg,
        count: nV.oN,
        totalCount: nV.oTN,
        unit: '单'
      },
      {
        title: '用户量',
        actionTagText: '年',
        actionTagType: 'danger',
        svg: UserSvg,
        count: nV.uN,
        totalCount: nV.uTn,
        unit: '人'
      },
      {
        title: '成交额',
        actionTagText: '月',
        actionTagType: '',
        svg: BalanceSvg,
        count: nV.pN,
        totalCount: nV.pTN,
        prefix: '¥',
        unit: '元'
      }
    ];
  },
  {
    deep: true
  }
);

let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));

const listData = ref<DataCardProps[]>([
  {
    title: '访问量',
    actionTagText: '日',
    actionTagType: 'success',
    svg: VisitSvg,
    count: 0,
    totalCount: 0,
    unit: '次'
  },
  {
    title: '订单量',
    actionTagText: '周',
    actionTagType: 'warning',
    svg: OrderSvg,
    count: 0,
    totalCount: 0,
    unit: '单'
  },
  {
    title: '用户量',
    actionTagText: '年',
    actionTagType: 'danger',
    svg: UserSvg,
    count: 0,
    totalCount: 0,
    unit: '人'
  },
  {
    title: '成交额',
    actionTagText: '月',
    actionTagType: '',
    svg: BalanceSvg,
    count: 0,
    totalCount: 0,
    prefix: '¥',
    unit: '元'
  }
]);
</script>
<style lang="scss" scoped></style>
