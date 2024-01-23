<template>
  <div class="container">
    <TopModule />
    <el-row :gutter="normalPadding">
      <el-col :md="12" :sm="24" :xs="24">
        <OrderTrend />
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <BalanceTrend />
      </el-col>
    </el-row>
    <el-row :gutter="normalPadding">
      <el-col :md="12" :sm="24" :xs="24">
        <VisitCard />
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <DealCard />
      </el-col>
    </el-row>
    <el-row :gutter="normalPadding">
      <el-col :md="10" :sm="24" :xs="24">
        <ConversionCard />
      </el-col>
      <el-col :md="14" :sm="24" :xs="24">
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
import { getCssVariableValue } from '@/utils/css';
defineOptions({
  name: 'Dashboard'
});
let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));
</script>
<style lang="scss" scoped>
.container {
  padding: 0 var(--normal-padding) var(--normal-padding) var(--normal-padding);
  :deep(.el-col) {
    margin-top: var(--normal-padding);
  }
}
</style>
