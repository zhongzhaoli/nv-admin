<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :align-center="alignCenter"
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
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const CONFIRM_BTN_TEXT = i18n.t('msg.confirm');
const CANCEL_BTN_TEXT = i18n.t('msg.close');

interface ComponentProps {
  modelValue: boolean;
  title?: string;
  alignCenter?: boolean;
  width?: string | number;
  confirmBtnText?: string;
  cancelBtnText?: string;
  submitLoading?: boolean;
}

withDefaults(defineProps<ComponentProps>(), {
  submitLoading: false,
  alignCenter: false
});
const emits = defineEmits(['close', 'closed', 'update:modelValue', 'submit']);

const closed = () => {
  emits('update:modelValue', false);
  emits('closed');
};

const submit = () => {
  emits('submit');
};
</script>
<style lang="scss" scoped></style>
