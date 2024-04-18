<template>
  <Card title="转换率">
    <div v-loading="loading" style="height: 400px" v-if="loading" />
    <div v-else class="echart" ref="target" />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import { ref, Ref, nextTick, watch } from 'vue';
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
    legend: {
      orient: 'vertical',
      left: '0%'
    },
    tooltip: {},
    radar: {
      splitNumber: 6,
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
            value: props.data.ld,
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
            value: props.data.td,
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
