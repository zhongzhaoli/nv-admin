<template>
  <div class="SelectTargetUserComponent" v-loading="loading">
    <Scroll :loadingMore="loadingMore" :disabled="false" @load="loadMore">
      <div class="userList">
        <div class="userItem" v-for="item in list" :key="item.id">
          <div class="userItemLeft">
            <el-avatar :src="item.avatar" :size="32" />
            <span class="username">{{ item.username }}</span>
          </div>
          <div class="userItemRight">
            <div class="checkBox">
              <el-checkbox v-model="item.checked" />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup lang="ts">
import { ref, unref } from 'vue';
import Scroll from './scroll.vue';
import * as API_USERS from '@/api/users';
import { PAGE } from '@/constants/app';
const currentPage = ref<number>(PAGE);
const pageSize = ref<number>(15);
const total = ref(0);
const loading = ref<boolean>(true);
const list = ref<any[]>([]);
const loadingMore = ref<boolean>(false);
// 获取用户列表
const getListFun = async (load: boolean = false) => {
  if (load) {
    loadingMore.value = true;
  } else {
    loading.value = true;
  }
  try {
    const { data } = await API_USERS.getUsersList({
      page: currentPage.value,
      pageSize: pageSize.value
    });
    currentPage.value = data.page;
    list.value = [
      ...list.value,
      ...data.list.map((item) => ({ ...item, checked: false }))
    ];
    total.value = data.total;
    if (unref(list).length < unref(total)) {
      loadingMore.value = true;
    } else {
      loadingMore.value = false;
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  if (unref(list).length < unref(total)) {
    currentPage.value++;
    getListFun(true);
  }
};

getListFun();
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.SelectTargetUserComponent {
  .userList {
    padding: 0 20px;
    .userItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ebeef5;
      .userItemLeft {
        flex: 1;
        display: flex;
        align-items: center;
        & > .username {
          margin-left: 14px;
          @include text-ellipsis(1);
        }
      }
      .userItemRight {
        margin-left: 20px;
        & > .checkBox {
          width: 16px;
          height: 16px;
          :deep(.el-checkbox) {
            width: 100%;
            height: 100%;
          }
          :deep(.el-checkbox__inner) {
            border-radius: 50%;
            width: 16px;
            height: 16px;
          }
          :deep(.el-checkbox__inner::after) {
            top: 2px;
            left: 5px;
          }
        }
      }
    }
  }
}
</style>
