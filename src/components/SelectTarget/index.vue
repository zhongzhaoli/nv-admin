<template>
  <div class="selectTargetComponent">
    <Teleport to="body">
      <ConfirmDialog
        width="400px"
        align-center
        @closed="closed"
        @close="close"
        v-model="cVisible"
        :submit-loading="submitLoading"
        class="bodyNoPadding hideHeader"
        @submit="submitFun"
      >
        <div class="Dialogbody">
          <div v-if="!closedVisible">
            <DataList
              :api="api"
              :avatarShape="avatarShape"
              :nameKey="nameKey"
              :multiple="multiple"
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
import { withDefaults } from 'vue';
import ConfirmDialog from '../ConfirmDialog/index.vue';
import DataList from './dataList.vue';
import { DEFAULT_AVATAR_SHAPE, AVATAR_SHAPE } from '@/constants/app';
import { useSelectTarget } from './useSelectTarget';

export interface ComponentProps {
  nameKey: string;
  api: Function;
  multiple?: boolean;
  submitLoading?: boolean;
  defaultSelectList?: any;
  avatarShape?: AVATAR_SHAPE;
}
const props = withDefaults(defineProps<ComponentProps>(), {
  avatarShape: DEFAULT_AVATAR_SHAPE,
  defaultSelectList: [],
  multiple: true,
  submitLoading: false
});
const emits = defineEmits(['submit', 'close', 'closed']);

const {
  openDialog,
  closeDialog,
  closed,
  close,
  submitFun,
  selectChange,
  cVisible,
  closedVisible
} = useSelectTarget(emits, props);

defineExpose({
  openDialog,
  closeDialog
});
</script>
<style lang="scss" scoped></style>
