<template>
  <span>{{ value }}</span>
</template>
<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core';
import {
  ref,
  computed,
  withDefaults,
  unref,
  onMounted,
  watch,
  watchEffect
} from 'vue';
import { isNumber } from 'lodash-es';

interface CountUpProps {
  // 开始值
  startVal?: number;
  // 结束值
  endVal: number;
  // 动画时长
  duration?: number;
  // 动画效果
  transition?: string;
  // 前缀
  prefix?: string;
  // 后缀
  suffix?: string;
  // 是否使用动画
  useEasing?: boolean;
  // 是否自动开始
  autoplay?: boolean;
  // 保留几位小数
  decimals?: number;
  // 分离器 将1000000转换为1,000,000
  separator?: string;
}

const emits = defineEmits(['onStarted', 'onFinished']);

const props = withDefaults(defineProps<CountUpProps>(), {
  startVal: 0,
  endVal: 2023,
  duration: 2000,
  transition: 'linear',
  useEasing: true,
  autoplay: true,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ','
});

const source = ref<number>(props.startVal);
let outputValue = useTransition(source);
const value = computed(() => formatNumber(unref(outputValue)));

const run = () => {
  outputValue = useTransition(source, {
    duration: props.duration,
    onStarted: () => emits('onStarted'),
    onFinished: () => emits('onFinished'),
    ...(props.useEasing
      ? {
          transition:
            TransitionPresets[
              props.transition as keyof typeof TransitionPresets
            ]
        }
      : {})
  });
};

const start = () => {
  run();
  source.value = props.endVal;
};

const reset = () => {
  source.value = props.startVal;
  run();
};

const formatNumber = (num: string | number) => {
  if (!num && num !== 0) {
    return '';
  }
  // 处理一些额外的字符串 prefix suffix decimals
  const { decimals, prefix, suffix, separator } = props;
  // 先处理保留小数问题
  num = Number(num).toFixed(decimals);
  // 变成字符串
  num += '';

  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';

  // 处理整数部份的分隔符 变成1,000,000
  const rgx = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }
  return `${prefix}${x1}${x2}${suffix}`;
};

watchEffect(() => {
  source.value = props.startVal;
});

// 这是后期变化之后才会执行start
watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    reset();
    start();
  }
});

// 这是初始化的时候执行start
onMounted(() => {
  console.log(1);
  props.autoplay && start();
});

defineExpose({ reset });
</script>
<style lang="scss" scoped></style>
