<template>
  <div class="selectTargetDialogComponent">
    <Teleport to="body">
      <ConfirmDialog
        width="400px"
        align-center
        @closed="closed"
        @close="close"
        v-model="cVisible"
        :title="title"
        class="bodyNoPadding hideHeader"
        @submit="submitFun"
      >
        <div class="Dialogbody">
          <div v-if="!closedVisible">
            <DataList
              :type="type"
              :nameKey="nameKey"
              :defaultSelectList="defaultSelectList"
              @change="selectChange"
            />
          </div>
        </div>
      </ConfirmDialog>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref, unref, watch } from 'vue';
import ConfirmDialog from '../ConfirmDialog/index.vue';
import DataList from './dataList.vue';

export type SelectTargetType = 'User' | 'Department';

interface ComponentProps {
  type: SelectTargetType;
  modelValue: boolean;
  nameKey: string;
  defaultSelectList: any[];
  title: string;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['submit', 'update:modelValue']);

const selectList = ref<any[]>([]);
const closedVisible = ref<boolean>(false);
const cVisible = ref<boolean>(false);
watch(
  () => props.modelValue,
  (nV: boolean) => {
    cVisible.value = nV;
    if (nV) closedVisible.value = false;
  }
);

const closed = () => {
  closedVisible.value = true;
};

const close = () => {
  emits('update:modelValue', false);
};

const selectChange = (list: any[]) => {
  selectList.value = list;
};

// 确认
const submitFun = () => {
  emits('update:modelValue', false);
  emits('submit', { type: unref(props.type), list: unref(selectList) });
};
</script>
<style lang="scss" scoped></style>
