<template>
  <Teleport to="body">
    <ConfirmDialog
      width="400px"
      v-model="passwordVisible"
      @closed="closed"
      :submit-loading="loading"
      :title="$t('msg.navbar.userDropdown.updatePassword')"
      @submit="submitFun"
    >
      <el-form
        ref="formRef"
        :model="passwordValue"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          prop="oldPassword"
          :label="$t('msg.navbar.userDropdown.oldPassword')"
        >
          <el-input
            :placeholder="$t('msg.navbar.userDropdown.oldPasswordPlaceholder')"
            v-model="passwordValue.oldPassword"
          />
        </el-form-item>
        <el-form-item
          prop="newPassword"
          :label="$t('msg.navbar.userDropdown.newPassword')"
        >
          <el-input
            :placeholder="$t('msg.navbar.userDropdown.newPasswordPlaceholder')"
            v-model="passwordValue.newPassword"
          />
        </el-form-item>
        <el-form-item
          prop="confirmPassword"
          :label="$t('msg.navbar.userDropdown.confirmPassword')"
        >
          <el-input
            :placeholder="
              $t('msg.navbar.userDropdown.confirmPasswordPlaceholder')
            "
            v-model="passwordValue.confirmPassword"
          />
        </el-form-item>
      </el-form>
    </ConfirmDialog>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog/index.vue';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import { useI18n } from '@/hooks/useI18n';
import { cloneDeep } from 'lodash-es';
import { changePassword, type PasswordDto } from '@/api/user/user';
const { t } = useI18n();

// 修改密码
const passwordVisible = ref<boolean>(false);
const rules: FormRules = {
  oldPassword: {
    required: true,
    message: t('msg.navbar.userDropdown.oldPasswordNotEmpty')
  },
  newPassword: {
    required: true,
    message: t('msg.navbar.userDropdown.newPasswordNotEmpty')
  },
  confirmPassword: [
    {
      required: true,
      message: t('msg.navbar.userDropdown.confirmPasswordNotEmpty')
    },
    {
      validator: (_rule, value, callback) => {
        if (value.trim() === '') {
          callback();
        } else if (value !== passwordValue.value.newPassword) {
          callback(new Error(t('msg.navbar.userDropdown.passwordNotEqual')));
        } else {
          callback();
        }
      }
    }
  ]
};
const initPassword: PasswordDto = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};
const passwordValue = ref<PasswordDto>(cloneDeep(initPassword));
const formRef = ref<FormInstance | null>(null);
const closed = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
const loading = ref<boolean>(false);
const submitFun = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (val: boolean) => {
    if (!val) return;
    loading.value = true;
    try {
      await changePassword(passwordValue.value);
      ElMessage.success('修改成功');
      passwordVisible.value = false;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  });
};

const openDialog = () => {
  passwordVisible.value = true;
};

export interface ChangePasswordInstance {
  openDialog: () => void;
}

defineExpose({
  openDialog
});
</script>
<style scoped></style>
