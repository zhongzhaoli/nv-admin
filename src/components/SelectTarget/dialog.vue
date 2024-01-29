<template>
  <div class="selectTargetDialogComponent">
    <Teleport to="body">
      <ConfirmDialog
        width="400px"
        align-center
        @closed="closed"
        @close="close"
        v-model="cVisible"
        class="bodyNoPadding hideHeader"
        @submit="submitFun"
      >
        <div class="Dialogbody">
          <div v-if="!closedVisible">
            <DataList
              :api="api"
              :avatarShape="avatarShape"
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
import { ref, unref, watch, withDefaults } from 'vue';
import ConfirmDialog from '../ConfirmDialog/index.vue';
import DataList from './dataList.vue';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_AVATAR_SHAPE, AVATAR_SHAPE } from '@/constants/app';

interface ComponentProps {
  modelValue: boolean;
  nameKey: string;
  api: Function;
  defaultSelectList: any[];
  avatarShape?: AVATAR_SHAPE;
}
const props = withDefaults(defineProps<ComponentProps>(), {
  avatarShape: DEFAULT_AVATAR_SHAPE
});
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
  emits('submit', cloneDeep(unref(selectList)));
};
</script>
<style lang="scss" scoped></style>
