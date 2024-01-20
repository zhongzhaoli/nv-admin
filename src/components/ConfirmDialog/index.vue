<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    @closed="closed"
  >
    <slot />
    <template #footer>
      <el-button type="primary" :loading="submitLoading" @click="submit">{{
        confirmBtnText || CONFIRM_BTN_TEXT
      }}</el-button>
      <el-button @click="closed">{{
        cancelBtnText || CANCEL_BTN_TEXT
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { withDefaults } from 'vue';
const CONFIRM_BTN_TEXT = '确认';
const CANCEL_BTN_TEXT = '关闭';

interface ComponentProps {
  modelValue: boolean;
  title?: string;
  width?: string | number;
  confirmBtnText?: string;
  cancelBtnText?: string;
  submitLoading?: boolean;
}

withDefaults(defineProps<ComponentProps>(), {
  submitLoading: false
});
const emits = defineEmits(['close', 'closed', 'update:modelValue', 'submit']);

const closed = () => {
  emits('update:modelValue', false);
};

const submit = () => {
  emits('submit');
};
</script>
<style lang="scss" scoped></style>
