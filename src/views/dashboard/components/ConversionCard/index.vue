<template>
  <Card title="转换率">
    <div class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, onMounted, Ref } from 'vue';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';

const target = ref<HTMLElement | null>(null);

const renderChart = () => {
  const { setOptions } = useEcharts(target as Ref<HTMLElement>);
  const options: EChartsOption = {
    legend: {
      orient: 'vertical',
      left: '0%'
    },
    tooltip: {},
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '服饰', max: 3000 },
        { name: '玩具', max: 3000 },
        { name: '虚拟', max: 3000 },
        { name: '3C', max: 3000 },
        { name: '文具', max: 3000 },
        { name: '机械', max: 3000 }
      ]
    },
    series: [
      {
        name: '转换率',
        type: 'radar',
        data: [
          {
            value: [420, 300, 2000, 1200, 2000, 1800],
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
            value: [500, 1400, 2800, 2600, 2200, 2100],
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
  setOptions(options);
};

onMounted(() => {
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
