<template>
  <div class="container">
    <div class="header">
      <span>
        {{ $t('msg.notification.title') }}
      </span>
      <el-button type="primary" circle @click="toCreate">
        <i class="ri-mail-send-line" />
      </el-button>
    </div>
    <div class="body">
      <div class="listBox" v-if="!loading && activities.length">
        <div class="item" v-for="item in activities" :key="item.id">
          <Item class="item" :notice="item" />
        </div>
      </div>
      <div class="loadingContainer" v-if="loading" v-loading="loading" />
      <div
        class="noDataContainer flex-center"
        v-if="!loading && !activities.length"
      >
        没有更多通知
      </div>
      <div class="flex-center" v-if="!(activities.length >= total)">
        <el-button @click="loadMore" :loading="loadingMore" type="primary">{{
          $t('msg.notification.loadMore')
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { PAGE } from '@/constants/app';
import * as API_NOTIFICATION from '@/api/notification';
import Item, { type Notice } from '@/components/NotificationItem/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const activities = ref<Notice[]>([]);

const loading = ref<boolean>(true);
const loadingMore = ref<boolean>(false);
const total = ref<number>(0);
const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(15);
// 获取通知列表
const getListFun = async (more: boolean = false) => {
  if (!more) {
    loading.value = true;
  } else {
    loadingMore.value = true;
  }
  try {
    const { data } = await API_NOTIFICATION.getNotificationList({
      page: currentPage.value,
      pageSize: pageSize.value
    });
    currentPage.value = data.page;
    activities.value = [...activities.value, ...data.list];
    total.value = data.total;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const toCreate = () => {
  router.push('/notification/create');
};
// 加载更多
const loadMore = () => {
  currentPage.value++;
  getListFun(true);
};
getListFun();
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  & > .header {
    font-size: 20px;
    padding-left: var(--normal-padding);
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--normal-padding);
  }
  .body {
    & > .listBox {
      background-color: #fff;
      border: 1px solid var(--normal-border-color);
      border-radius: 4px;
      padding: 0 var(--normal-padding);
      & > .item {
        padding: var(--normal-padding) 0;
        cursor: pointer;
        &:not(:last-child) {
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
    & > .loadingContainer {
      height: 100px;
      background-color: #fff;
      border: 1px solid var(--normal-border-color);
      border-radius: 4px;
      padding: 0 var(--normal-padding);
    }
    & > .noDataContainer {
      height: 100px;
      background-color: #fff;
      border: 1px solid var(--normal-border-color);
      border-radius: 4px;
      padding: 0 var(--normal-padding);
      color: #777;
    }
    & > .flex-center {
      margin-top: var(--normal-padding);
    }
  }
}
</style>
