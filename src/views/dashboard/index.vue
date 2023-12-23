<template>
  <div class="container">
    <TopModule />
    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <OrderTrend />
      </el-col>
      <el-col :span="12">
        <BalanceTrend />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <VisitCard />
      </el-col>
      <el-col :span="12">
        <DealCard />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-20">
      <el-col :span="8">
        <ConversionCard />
      </el-col>
      <el-col :span="16">
        <StoreVisitCard />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import TopModule from './components/TopModule/index.vue';
import OrderTrend from './components/OrderTrend/index.vue';
import BalanceTrend from './components/BalanceTrend/index.vue';
import ConversionCard from './components/ConversionCard/index.vue';
import VisitCard from './components/VisitCard/index.vue';
import DealCard from './components/DealCard/index.vue';
import StoreVisitCard from './components/StoreVisitCard/index.vue';
import { useWindowSizeFn } from '@/hooks/useWindowSizeFn';
useWindowSizeFn(() => {});
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  & .mt-20 {
    margin-top: 20px;
  }
}
</style>
