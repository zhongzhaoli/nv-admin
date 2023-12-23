<template>
  <Card title="访问来源">
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
    initOptions: {
      renderer: 'svg'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `访问来源<br/>${params.marker}${params.name}: ${params.value} (${params.percent}%)`;
      }
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
