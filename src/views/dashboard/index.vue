<template>
  <div class="container">
    <TopModule :data="topData" :loading="topLoading" />
    <el-row :gutter="normalPadding">
      <el-col :md="12" :sm="24" :xs="24">
        <OrderTrend :data="oneData" :loading="otherOne" />
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <BalanceTrend :data="twoData" :loading="otherTwo" />
      </el-col>
    </el-row>
    <el-row :gutter="normalPadding">
      <el-col :md="12" :sm="24" :xs="24">
        <VisitCard :data="threeData" :loading="otherThree" />
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <DealCard :data="fourData" :loading="otherFour" />
      </el-col>
    </el-row>
    <el-row :gutter="normalPadding">
      <el-col :md="10" :sm="24" :xs="24">
        <ConversionCard :data="fiveData" :loading="otherFive" />
      </el-col>
      <el-col :md="14" :sm="24" :xs="24">
        <StoreVisitCard :data="sixData" :loading="otherSix" />
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
import * as API_DASHBOARD from '@/api/dashboard';
import { ref } from 'vue';
import {
  TopFourProps,
  OtherOneProps,
  OtherTwoProps,
  OtherThreeProps,
  OtherFourProps,
  OtherFiveProps,
  OtherSixProps
} from '@/api/dashboard';
defineOptions({
  name: 'Dashboard'
});
let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));

const topLoading = ref(true);
const topData = ref<TopFourProps>({
  vN: 0,
  vTN: 0,
  oN: 0,
  oTN: 0,
  uN: 0,
  uTn: 0,
  pN: 0,
  pTN: 0
});
const getTopFour = async () => {
  topLoading.value = true;
  try {
    const { data } = await API_DASHBOARD.getTopFour();
    topData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    topLoading.value = false;
  }
};

const otherOne = ref(true);
const oneData = ref<OtherOneProps>({
  ld: [],
  td: []
});
const getOtherOne = async () => {
  otherOne.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherOne();
    oneData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherOne.value = false;
  }
};

const otherTwo = ref(true);
const twoData = ref<OtherTwoProps>({
  ld: [],
  td: []
});
const getOtherTwo = async () => {
  otherTwo.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherTwo();
    twoData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherTwo.value = false;
  }
};

const otherThree = ref(true);
const threeData = ref<OtherThreeProps>({
  list: []
});
const getOtherThree = async () => {
  otherThree.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherThree();
    threeData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherThree.value = false;
  }
};

const otherFour = ref(true);
const fourData = ref<OtherFourProps>({
  list: []
});
const getOtherFour = async () => {
  otherFour.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherFour();
    fourData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherFour.value = false;
  }
};

const otherFive = ref(true);
const fiveData = ref<OtherFiveProps>({
  ld: [],
  td: []
});
const getOtherFive = async () => {
  otherFive.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherFive();
    fiveData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherFive.value = false;
  }
};

const otherSix = ref(true);
const sixData = ref<OtherSixProps>({
  list: []
});
const getOtherSix = async () => {
  otherSix.value = true;
  try {
    const { data } = await API_DASHBOARD.getOtherSix();
    sixData.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    otherSix.value = false;
  }
};

setTimeout(() => {
  getTopFour();
  getOtherOne();
  getOtherTwo();
  getOtherThree();
  getOtherFour();
  getOtherFive();
  getOtherSix();
}, 500);
</script>
<style lang="scss" scoped>
.container {
  padding: 0 var(--normal-padding) var(--normal-padding) var(--normal-padding);
  :deep(.el-col) {
    margin-top: var(--normal-padding);
  }
}
</style>
