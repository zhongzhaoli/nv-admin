<template>
  <Card title="订单趋势">
    <div class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { EChartsOption, ECharts } from 'echarts';
const target = ref<HTMLElement | null>(null);
let myEchart: ECharts;
const renderChart = () => {
  const options: EChartsOption = {
    initOptions: {
      renderer: 'svg'
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#999',
          width: 0.2
        }
      },
      axisLine: {
        lineStyle: {
          color: '#999',
          width: 0.2
        }
      },
      axisTick: {
        show: false
      },
      data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '5%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      max: 400,
      interval: 100,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#999',
          width: 0.2
        }
      }
    },
    series: [
      {
        name: '昨日订单量',
        smooth: true,
        data: [0, 80, 250, 139, 189, 300, 0],
        type: 'line',
        symbolSize: 6,
        lineStyle: {
          color: '#0c78ff'
        },
        areaStyle: {
          color: '#0c78ff',
          opacity: 0.5
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#bd51c0' },
            { offset: 1, color: '#0c78ff' }
          ])
        }
      },
      {
        name: '今日订单量',
        smooth: true,
        data: [0, 200, 321, 230, 300, 100, 0],
        type: 'line',
        symbolSize: 6,
        areaStyle: {
          color: '#bd51c0',
          opacity: 0.5
        },
        lineStyle: {
          color: '#bd51c0'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0c78ff' },
            { offset: 1, color: '#bd51c0' }
          ])
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
  height: 320px;
  padding: 20px;
}
</style>
