import * as echarts from 'echarts';
import { EChartsOption, ECharts } from 'echarts';
import { useWindowSizeFn } from './useWindowSizeFn';
import { Ref, unref } from 'vue';

export function useEcharts(dom: Ref<HTMLElement>) {
  let chart: ECharts;
  const init = () => {
    const el = unref(dom);
    if (!el || !unref(el)) {
      return;
    }
    chart = echarts.init(el);
  };
  init();

  const setOptions = (options: EChartsOption) => {
    chart.setOption(options);
  };

  const { start } = useWindowSizeFn(() => {
    chart.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    });
  });
  start();

  return { init, setOptions };
}
