<template>
  <div class="container">
    <div class="isloading" v-if="loading" v-loading="loading" />
    <div class="box" v-else>
      <div class="header">
        <div class="title">{{ detail.title }}</div>
        <div class="tooltip">
          <div class="author">作者：Custer</div>
          <div class="time">发布时间：2021-08-01 12:00</div>
          <div class="read">
            <i class="ri-eye-line" />
            <span>阅读量：100</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="editor-content-view" v-html="detail.content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Prism from 'prismjs';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { ElMessage } from 'element-plus';
import * as API_NOTIFICATION from '@/api/notification';
import 'prismjs/themes/prism.css';
import '@/styles/editor.css';

defineOptions({
  name: 'NotificationDetail'
});

const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();

const loading = ref<boolean>(true);
const detail = ref<any>({});
const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_NOTIFICATION.getNotificationDetail(
      route.params.id as string | number
    );
    detail.value = data;
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!route.params.id) {
    ElMessage({
      message: '找不到此通知了，3秒后返回上一页',
      duration: 3000,
      type: 'error'
    });
    setTimeout(() => {
      tagsViewStore.delVisitedView(route);
      router.go(-1);
    }, 3000);
  } else {
    getListFun();
  }
});
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  min-height: 100%;
  .isloading {
    min-height: 300px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: 20px;
  }
  .box {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid var(--normal-border-color);
    padding: 20px;
    & > .header {
      border-bottom: 1px solid #eaeaea;
      padding-bottom: var(--normal-padding);
      & > .title {
        font-size: 24px;
        font-weight: bold;
      }
      & > .tooltip {
        display: flex;
        align-items: center;
        color: #00000073;
        font-size: 12px;
        margin-top: 6px;
        & > div {
          & > [class^='ri-'] {
            margin-right: 4px;
          }
          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
