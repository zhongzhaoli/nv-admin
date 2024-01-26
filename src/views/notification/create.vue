<template>
  <div class="container">
    <div class="box">
      <el-form label-position="top">
        <el-form-item label="发送对象：">
          <div class="accessDiv" @click="openDrawer">
            <div class="leftBox">
              <i class="ri-user-3-line" />
              <div class="type">
                {{ whoType === 'can' ? '谁可以看' : '谁不可看' }}
              </div>
            </div>
            <div class="rightBox">
              <div class="text">公开</div>
              <i class="ri-arrow-right-s-line" />
            </div>
          </div>
        </el-form-item>
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
    <AccessTargetDrawer @closed="drawerOpen = false" :drawerOpen="drawerOpen" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Editor from '@/components/Editor/index.vue';
import { DRAFT_LOCALSTORAGE_KEY } from '@/constants/notification';
import { ElMessage } from 'element-plus';
import { useI18n } from '@/hooks/useI18n';
import { useMessageBox } from '@/hooks/useMessageBox';
import { ACCESS_TYPE } from '@/constants/accessTarget';
import AccessTargetDrawer from '@/components/AccessTargetDrawer/index.vue';
const { t } = useI18n();
defineOptions({
  name: 'NotificationCreate'
});

const editRef = ref();
const title = ref<string>('');
const content = ref<string>('');
const whoType = ref<ACCESS_TYPE>('can');
const drawerOpen = ref<boolean>(false);

// 打开抽屉
const openDrawer = () => {
  drawerOpen.value = true;
};

// 保存草稿
const saveDraft = () => {
  const draft = {
    title: title.value,
    content: editRef.value.getHtml()
  };
  localStorage.setItem(DRAFT_LOCALSTORAGE_KEY, JSON.stringify(draft));
  ElMessage.success(t('msg.notification.draftMessage'));
};

// 发送
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
    & .accessDiv {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f8f8f8;
      cursor: pointer;
      padding: 0 14px;
      border-radius: 4px;
      width: 300px;
      height: 40px;
      font-size: 14px;
      transition: all 0.3s;
      &:hover {
        background-color: #f6f6f6;
      }
      & > .leftBox {
        display: flex;
        align-items: center;
        & > i {
          font-size: 14px;
        }
        & > div.type {
          margin-left: 8px;
        }
      }
      & > .rightBox {
        display: flex;
        align-items: center;
        & > i {
          font-size: 18px;
        }
        & > div.text {
          margin-right: 4px;
        }
      }
    }
    & > .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
