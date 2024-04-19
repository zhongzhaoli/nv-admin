<template>
  <Card :title="$t('msg.workbenches.latestNotice')" v-loading="loading">
    <template #action>
      <el-button type="primary" link @click="toAll">{{
        $t('msg.workbenches.more')
      }}</el-button>
    </template>
    <template #default>
      <div class="cardBody">
        <div class="listBox" v-if="!loading && activities.length">
          <Item
            class="item"
            v-for="(item, index) in activities"
            :key="index"
            :notice="item"
          />
        </div>
        <div class="noDataBox" v-if="!loading && !activities.length">
          暂无数据
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import Item, { type Notice } from '@/components/NotificationItem/index.vue';
import { PAGE } from '@/constants/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as API_NOTIFICATION from '@/api/notification';
import { WORKBENCHES_MITT_KEY } from '@/constants/mittKey';
import { useMitt } from '@/hooks/useMitt';
const wMitt = useMitt(WORKBENCHES_MITT_KEY);
const router = useRouter();
const toAll = () => {
  router.push('/notification/list');
};
const activities = ref<Notice[]>([]);
const loading = ref<boolean>(true);
const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(8);
// 获取通知列表
const getListFun = async () => {
  loading.value = true;
  try {
    const { data } = await API_NOTIFICATION.getNotificationList({
      page: currentPage.value,
      pageSize: pageSize.value
    });
    currentPage.value = data.page;
    activities.value = data.list;
    wMitt.send({
      key: 'notification',
      value: data.total
    });
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
getListFun();
</script>
<style lang="scss" scoped>
.cardBody {
  padding: 24px 40px;
  & > .listBox {
    & > .item:not(:last-child) {
      border-bottom: 1px #f0f0f0 solid;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
  }
  & > .noDataBox {
    height: 150px;
    text-align: center;
    color: #777;
    line-height: 150px;
  }
}
</style>
