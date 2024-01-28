<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :align-center="alignCenter"
    :show-close="showClose"
    @closed="closed"
    @close="close"
  >
    <slot />
    <template #footer>
      <el-button
        type="primary"
        v-if="showConfirmBtn"
        :loading="submitLoading"
        @click="submit"
        >{{ confirmBtnText || CONFIRM_BTN_TEXT }}</el-button
      >
      <el-button v-if="showCancelBtn" @click="close">{{
        cancelBtnText || CANCEL_BTN_TEXT
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { withDefaults, ref, watch } from 'vue';
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
  showClose?: boolean;
  showConfirmBtn?: boolean;
  showCancelBtn?: boolean;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  submitLoading: false,
  alignCenter: false,
  showClose: true,
  showCancelBtn: true,
  showConfirmBtn: true
});
const emits = defineEmits(['close', 'closed', 'update:modelValue', 'submit']);
const visible = ref<boolean>(false);
watch(
  () => props.modelValue,
  (nV) => {
    visible.value = nV;
  },
  {
    immediate: true
  }
);

const close = () => {
  emits('update:modelValue', false);
  emits('close');
};

const closed = () => {
  emits('closed');
};

const submit = () => {
  emits('submit');
};
</script>
<style lang="scss" scoped></style>
