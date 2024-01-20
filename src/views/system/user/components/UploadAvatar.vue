<template>
  <div
    class="uploadAvatarComponent"
    :style="{
      width: size || DEFAULT_SIZE + 'px',
      height: size || DEFAULT_SIZE + 'px'
    }"
  >
    <div class="avatarBox" v-if="modelValue">
      <el-avatar :src="modelValue" :size="size || DEFAULT_SIZE" />
      <div
        class="deleteBox"
        :style="{ left: size || DEFAULT_SIZE + 'px' }"
        @click="reset"
      >
        <i class="ri-close-line" />
      </div>
    </div>
    <div class="uploadBtn" v-else>
      <el-upload
        class="avatar-uploader"
        action="/common/fileUpload"
        :headers="uploadHeader"
        :show-file-list="false"
        :before-upload="beforeUpload"
        v-loading="loading"
        :on-success="onSuccess"
        :on-error="onError"
      >
        <i class="ri-camera-3-line" />
      </el-upload>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { ResponseCode, ResponseJson } from '@/config/request';
const DEFAULT_SIZE = 80;
const userStore = useUserStore();

interface ComponentProps {
  modelValue: string;
  size?: number;
}

withDefaults(defineProps<ComponentProps>(), {
  modelValue: ''
});
const emits = defineEmits(['update:modelValue']);

const uploadHeader = computed(() => {
  return {
    Authorization: `Bearer ${userStore.token}`
  };
});
const loading = ref<boolean>(false);

// 上传之前
const beforeUpload = () => {
  loading.value = true;
};

// 上传成功
const onSuccess = (response: ResponseJson) => {
  if (response.code === ResponseCode.SUCCESS) {
    emits('update:modelValue', response.data);
  }
  loading.value = false;
};

// 上传失败
const onError = () => {};

// 删除现有头像
const reset = () => {
  emits('update:modelValue', '');
};
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.uploadAvatarComponent {
  overflow: hidden;
  border-radius: 50%;
  & > .uploadBtn {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px rgba(0, 0, 0, 0.1) dashed;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    overflow: hidden;

    & > .avatar-uploader {
      width: 100%;
      height: 100%;
      :deep(.el-upload) {
        width: 100%;
        height: 100%;
      }
    }
    &:hover {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
  }
  & > .avatarBox {
    cursor: pointer;
    position: relative;
    & > .deleteBox {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 28px;
      font-weight: bold;
      @extend .flex-center;
      top: 0;
      transition: all 0.3s;
      z-index: 2;
    }
    &:hover > .deleteBox {
      left: 0 !important;
    }
  }
}
</style>
