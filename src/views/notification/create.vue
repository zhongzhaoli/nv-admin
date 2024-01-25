<template>
  <div class="container">
    <div class="box">
      <el-form label-position="top">
        <el-form-item label="通知标题：">
          <el-input v-model="title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="通知内容：">
          <Editor ref="editRef" />
        </el-form-item>
      </el-form>
      <div class="bottom">
        <div class="leftBox" />
        <div class="rightBox">
          <el-button @click="saveDraft">{{
            $t('msg.notification.draft')
          }}</el-button>
          <el-button type="primary" @click="submit">{{
            $t('msg.notification.send')
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Editor from '@/components/Editor/index.vue';
import { DRAFT_LOCALSTORAGE_KEY } from '@/constants/notification';
import { ElMessage } from 'element-plus';
import { useI18n } from '@/hooks/useI18n';
import { useMessageBox } from '@/hooks/useMessageBox';
const { t } = useI18n();
defineOptions({
  name: 'NotificationCreate'
});

const editRef = ref();
const title = ref<string>('');
const content = ref<string>('');

const saveDraft = () => {
  const draft = {
    title: title.value,
    content: editRef.value.getHtml()
  };
  localStorage.setItem(DRAFT_LOCALSTORAGE_KEY, JSON.stringify(draft));
  ElMessage.success(t('msg.notification.draftMessage'));
};

const submit = () => {
  content.value = editRef.value.getHtml();
  console.log(content.value);
};

onMounted(() => {
  const draft = localStorage.getItem(DRAFT_LOCALSTORAGE_KEY);
  if (draft) {
    useMessageBox(t('msg.notification.restoreDraft'), () => {
      const draftJson = JSON.parse(draft);
      title.value = draftJson.title;
      editRef.value.setHtml(draftJson.content);
      localStorage.removeItem(DRAFT_LOCALSTORAGE_KEY);
    });
  }
});
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  & > .box {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: 20px;
    & > .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
