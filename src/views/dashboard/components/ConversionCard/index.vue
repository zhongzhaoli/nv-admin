<template>
  <Card title="转换率">
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
    legend: {
      orient: 'vertical',
      left: '0%'
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '服饰', max: 30000 },
        { name: '玩具', max: 30000 },
        { name: '虚拟', max: 30000 },
        { name: '3C', max: 30000 },
        { name: '文具', max: 30000 },
        { name: '机械', max: 30000 }
      ]
    },
    series: [
      {
        name: '转换率',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 12000, 20000, 18000],
            areaStyle: {
              color: '#bd51c0',
              opacity: 0.2
            },
            symbolSize: 5,
            itemStyle: {
              color: '#bd51c0'
            },
            lineStyle: {
              color: '#bd51c0'
            },
            name: '成交数'
          },
          {
            value: [5000, 14000, 28000, 26000, 22000, 21000],
            name: '访问数',
            areaStyle: {
              color: '#fe5570',
              opacity: 0.2
            },
            itemStyle: {
              color: '#fe5570'
            },
            symbolSize: 5,
            lineStyle: {
              color: '#fe5570'
            }
          }
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
