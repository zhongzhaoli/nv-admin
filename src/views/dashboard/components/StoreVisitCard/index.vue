<template>
  <Card title="店铺访问数据">
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
      formatter: `{b}：{c}次`
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999',
          width: 1
        }
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 90, 200, 130, 140, 89],
        itemStyle: {
          color: '#97c7ff'
        },
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(0, 0, 0, 0.03)'
        }
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
