<template>
  <Card title="成交占比">
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
        return `成交占比<br/>${params.marker}${params.name}: ${params.value} (${params.percent}%)`;
      }
    },
    emphasis: {
      label: {
        show: true,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        name: '成交占比',
        type: 'pie',
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: true
        },
        data: [
          { value: 40, name: '服饰' },
          { value: 38, name: '玩具' },
          { value: 32, name: '虚拟' },
          { value: 26, name: '3C' },
          { value: 22, name: '文具' },
          { value: 18, name: '机械' }
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
