import { ACCESS_TYPE } from '@/constants/accessTarget';
import { ref } from 'vue';

export function useAccessTarget() {
  const accessType = ref<ACCESS_TYPE>('all');

  return {
    accessType
  };
}
