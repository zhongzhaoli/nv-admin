import { useDebounceFn, useWindowSize } from '@vueuse/core';
import { ref } from 'vue';
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';

interface UseWindowSizeOptions {
  wait?: number;
}

export function useWindowSizeFn(
  fn: Function,
  options: UseWindowSizeOptions = {}
) {
  const { wait = 300 } = options;
  const windowSize = ref<{ width: number; height: number }>();
  const getWindowSize = () => {
    const { width, height } = useWindowSize();
    windowSize.value = { width: width.value, height: height.value };
  };
  const debouncedFn = useDebounceFn(() => {
    getWindowSize();
    fn();
  }, wait);

  const start = () => {
    window.addEventListener('resize', debouncedFn);
  };

  const stop = () => {
    window.removeEventListener('resize', debouncedFn);
  };

  tryOnMounted(() => {
    getWindowSize();
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });

  return { start, stop, windowSize };
}
