<template>
  <Card title="订单趋势">
    <div v-loading="loading" style="height: 320px" v-if="loading" />
    <div v-else class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, watch, Ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { useEcharts } from '@/hooks/useEcharts';
const target = ref<HTMLElement | null>(null);

interface ComponentProps {
  loading: boolean;
  data: {
    ld: number[];
    td: number[];
  };
}

const props = defineProps<ComponentProps>();

const renderChart = () => {
  const { setOptions } = useEcharts(target as Ref<HTMLElement>);
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
        data: props.data.ld,
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
        data: props.data.td,
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
  height: 320px;
  padding: 20px;
}
</style>
