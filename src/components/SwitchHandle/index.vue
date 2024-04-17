<template>
  <div class="switchHandleComponent">
    <div class="mb" @click="changeSwitch" />
    <el-switch
      v-model="switchValue"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue';
import { useMessageBox } from '@/hooks/useMessageBox';
import { ElMessage } from 'element-plus';

interface ComponentProps {
  modelValue?: any;
  activeValue?: any;
  inactiveValue?: any;
  pId: string | number | undefined;
  api: (id: string | number, data: any) => any;
}

const switchValue = ref<any>(false);

const props = withDefaults(defineProps<ComponentProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false
});
watch(
  () => props.modelValue,
  (nV) => {
    switchValue.value =
      nV === props.activeValue ? props.activeValue : props.inactiveValue;
  },
  {
    immediate: true
  }
);

// 取相反
const getOpposite = () => {
  return switchValue.value === props.activeValue
    ? props.inactiveValue
    : props.activeValue;
};

// 修改状态
const changeSwitch = () => {
  useMessageBox('是否确认修改？', async () => {
    try {
      if (!props.api) throw new Error('未传入api');
      if (!props.pId) throw new Error('未传入pId');
      await props.api(props.pId, { status: getOpposite() });
      switchValue.value = getOpposite();
      ElMessage.success('修改成功');
    } catch (err) {
      console.error(err);
    }
  });
};
</script>
<style lang="scss" scoped>
.switchHandleComponent {
  position: relative;
  display: inline-block;
  & > .mb {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
