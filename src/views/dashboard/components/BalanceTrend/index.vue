<template>
  <Card title="交易额趋势">
    <div v-loading="loading" style="height: 320px" v-if="loading" />
    <div class="echart" v-else ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, Ref, watch, nextTick } from 'vue';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
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
    tooltip: {
      trigger: 'axis'
    },
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
      max: 8000,
      interval: 2000,
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
        name: '昨日交易额',
        smooth: true,
        data: props.data.ld,
        type: 'line',
        symbolSize: 6,
        lineStyle: {
          color: '#bd51c0'
        },
        areaStyle: {
          color: '#bd51c0',
          opacity: 0.5
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00c3a4' },
            { offset: 1, color: '#bd51c0' }
          ])
        }
      },
      {
        name: '今日交易额',
        smooth: true,
        data: props.data.td,
        type: 'line',
        symbolSize: 6,
        areaStyle: {
          color: '#00c3a4',
          opacity: 0.5
        },
        lineStyle: {
          color: '#00c3a4'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#bd51c0' },
            { offset: 1, color: '#00c3a4' }
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
