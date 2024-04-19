<template>
  <div class="container">
    <div class="box">
      <el-form label-position="top">
        <el-form-item label="发送对象：">
          <div class="accessDiv" @click="openDrawer">
            <div class="titleBox">
              <div class="leftBox" :class="whoType">
                <i class="ri-user-fill" />
                <div class="type">
                  {{ whoType === 'cant' ? '谁不可看' : '谁可以看' }}
                </div>
              </div>
              <div class="rightBox">
                <div class="text" v-if="whoType === 'all'">公开</div>
                <i class="ri-arrow-right-s-line" />
              </div>
            </div>
            <div class="selectObject" v-if="selectListObject">
              <div v-if="selectListObject.departmentList.length">
                - 部门：{{ selectListObject.departmentNameString }}
              </div>
              <div v-if="selectListObject.userList.length">
                - 用户：{{ selectListObject.userNameString }}
              </div>
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
    <AccessTargetDrawer
      ref="accessTargetDrawer"
      :type="whoType"
      :defaultSelectListObject="selectListObject"
      @submit="accessTargetSubmit"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, unref } from 'vue';
import Editor from '@/components/Editor/index.vue';
import { DRAFT_LOCALSTORAGE_KEY } from '@/constants/notification';
import { ElMessage } from 'element-plus';
import { useI18n } from '@/hooks/useI18n';
import { useMessageBox } from '@/hooks/useMessageBox';
import { ACCESS_TYPE } from '@/constants/accessTarget';
import AccessTargetDrawer, {
  type AccessTargetDrawerInstance
} from '@/components/AccessTargetDrawer/index.vue';
import { SelectListObjectProp } from '@/components/AccessTargetDrawer/useAccessTarget';
import * as API_NOTIFICATION from '@/api/notification';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useRoute } from 'vue-router';
import { toLastView } from '@/utils/route';
const { t } = useI18n();
const tagsViewStore = useTagsViewStore();
const route = useRoute();
defineOptions({
  name: 'NotificationCreate'
});

const editRef = ref();
const title = ref<string>('');
const content = ref<string>('');
const whoType = ref<ACCESS_TYPE>('all');
const selectListObject = ref<SelectListObjectProp | null>(null);
const accessTargetDrawer = ref<AccessTargetDrawerInstance | null>(null);

// 保存草稿
const saveDraft = () => {
  const draft = {
    title: title.value,
    content: editRef.value.getHtml()
  };
  localStorage.setItem(DRAFT_LOCALSTORAGE_KEY, JSON.stringify(draft));
  ElMessage.success(t('msg.notification.draftMessage'));
};

// 打开抽屉
const openDrawer = () => {
  if (accessTargetDrawer.value) accessTargetDrawer.value.openDrawer();
};

// 发送
const submit = async () => {
  content.value = editRef.value.getHtml();
  const deptList = selectListObject.value?.departmentList || [];
  const userList = selectListObject.value?.userList || [];
  if (!unref(title).trim()) return ElMessage.error('请输入标题');
  if (!unref(content).trim()) return ElMessage.error('请输入内容');
  useMessageBox('确定发布此通知吗？', async () => {
    try {
      await API_NOTIFICATION.createNotification({
        content: content.value,
        title: title.value,
        whoType: whoType.value,
        deptList: deptList.map((item) => item.id),
        userList: userList.map((item) => item.id)
      });
      ElMessage.success('发布成功');
      // 清除草稿
      localStorage.removeItem(DRAFT_LOCALSTORAGE_KEY);
      tagsViewStore.delVisitedView(route);
      tagsViewStore.delCachedView(route);
      toLastView(tagsViewStore.visitedViews);
    } catch (err) {
      console.error(err);
    }
  });
};

// 选择对象回调
const accessTargetSubmit = (
  type: ACCESS_TYPE,
  obj: SelectListObjectProp | null
) => {
  whoType.value = type;
  selectListObject.value = obj;
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
@import '@/styles/mixins.scss';
.container {
  padding: var(--normal-padding);

  & > .box {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: 20px;
    & .accessDiv {
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: #f8f8f8;
      cursor: pointer;
      padding: 4px 14px;
      border-radius: 4px;
      width: 350px;
      font-size: 14px;
      transition: all 0.3s;
      color: #555555;
      &:hover {
        background-color: #f6f6f6;
      }
      & > .titleBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .leftBox {
          display: flex;
          align-items: center;
          &.cant {
            color: #f56c6c;
          }
          &.can {
            color: #67c23a;
          }
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
      & > .selectObject {
        padding-left: 22px;
        font-size: 12px;
        margin-bottom: 4px;
        & > div {
          height: 20px;
          line-height: 20px;
          @include text-ellipsis(1);
          color: #5c5c5c;
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
