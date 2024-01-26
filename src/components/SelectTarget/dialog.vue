<template>
  <div class="selectTargetDialogComponent">
    <Teleport to="body">
      <ConfirmDialog
        width="400px"
        align-center
        @closed="closed"
        :model-value="visible"
        :title="title"
        class="bodyNoPadding"
      >
        <div class="Dialogbody">
          <div v-if="type === 'User' && visible">
            <User />
          </div>
          <div v-if="type === 'Department' && visible">
            <Department />
          </div>
        </div>
      </ConfirmDialog>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import ConfirmDialog from '../ConfirmDialog/index.vue';
import User from './user.vue';
import Department from './department.vue';
interface ComponentProps {
  type: 'User' | 'Department';
  visible: boolean;
  title: string;
}
defineProps<ComponentProps>();
const emits = defineEmits(['closed']);

const closed = () => {
  emits('closed');
};
</script>
<style lang="scss" scoped></style>
