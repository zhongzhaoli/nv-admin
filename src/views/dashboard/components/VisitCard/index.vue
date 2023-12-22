<template>
  <Card title="访问来源">
    <div class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import { EChartsOption, ECharts } from 'echarts';
const target = ref<HTMLElement | null>(null);
let myEchart: ECharts;

const renderChart = () => {
  const options: EChartsOption = {
    initOptions: {
      renderer: 'svg'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 4
        },

        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold'
          }
        },
        label: {
          show: true
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 1048, name: 'H5' },
          { value: 735, name: 'PC' },
          { value: 580, name: '小程序' },
          { value: 484, name: 'APP' },
          { value: 300, name: '支付宝' }
        ]
      }
    ]
  };
  myEchart.setOption(options);
};

onMounted(() => {
  myEchart = echarts.init(target.value as HTMLElement);
  renderChart();
});
</script>
<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 400px;
  padding: 20px;
}
</style>
