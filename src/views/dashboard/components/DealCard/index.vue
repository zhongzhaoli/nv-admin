<template>
  <Card title="成交占比">
    <div v-loading="loading" style="height: 400px" v-if="loading" />
    <div v-else class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, onMounted, Ref, watch, nextTick } from 'vue';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';
const target = ref<HTMLElement | null>(null);

interface ComponentProps {
  loading: boolean;
  data: {
    list: { value: number; name: string }[];
  };
}

const props = defineProps<ComponentProps>();

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
        data: props.data.list
      }
    ]
  };
  setOptions(options);
};

watch(
  () => props.loading,
  (nV) => {
    if (!nV) {
      nextTick(() => {
        renderChart();
      });
    }
  }
);
</script>
<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 400px;
  padding: 20px;
}
</style>
