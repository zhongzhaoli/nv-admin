<template>
  <Card :title="$t('msg.workbenches.department.title')">
    <template #default>
      <div class="cardBody">
        <div class="posterBox">
          <el-avatar :size="80" shape="square" :src="department.avatar" />
          <div class="textBox">
            <div class="title">{{ department.name }}</div>
            <div class="desc">{{ department.description }}</div>
          </div>
        </div>
        <div class="usersBox">
          <div class="userList">
            <el-avatar
              v-for="(item, index) in userInfo!.memberAvatarList"
              :key="index"
              :size="35"
              :style="{ '--i': index }"
              :src="item"
            />
            <div class="more" :style="{ '--i': userInfo!.memberCount }">
              <i class="ri-more-fill" />
            </div>
          </div>
          <div class="text">
            <el-button type="primary" link
              >{{ $t('msg.workbenches.department.count1') }}
              {{ userInfo!.memberCount }}
              {{ $t('msg.workbenches.department.count2') }}</el-button
            >
          </div>
        </div>
      </div>
    </template>
    <!-- <template #footer>
      <div class="contactBox">
        <div>
          <i class="ri-chat-smile-3-line" />
          <span>发信息</span>
        </div>
        <div>
          <i class="ri-file-copy-2-line" />
          <span>文件共享</span>
        </div>
      </div>
    </template> -->
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/Card/index.vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const department = computed(() => userStore.userInfo!.department);
</script>
<style lang="scss" scoped>
.cardBody {
  padding: 24px;
  & > .posterBox {
    display: flex;
    border-bottom: 1px #f6f6f6 solid;
    padding-bottom: 24px;
    & > .textBox {
      margin-left: 16px;
      & > .title {
        font-size: 16px;
        font-weight: bold;
      }
      & > .desc {
        font-size: 14px;
        color: #00000073;
        margin-top: 4px;
      }
    }
  }
  & > .usersBox {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .userList {
      position: relative;
      height: 35px;
      & > .el-avatar {
        position: absolute;
        left: calc(22px * var(--i));
        border: 2px #fff solid;
      }
      & > .more {
        color: #999;
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #eaeaea;
        border: 2px #fff solid;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: calc(22px * var(--i));
      }
    }
  }
}
.contactBox {
  height: 40px;
  background-color: #fff;
  & > div {
    display: inline-flex;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.3s;
    color: var(--normal-text-color-sliver);
    &:hover {
      color: var(--el-color-primary-light-5);
    }
    & > i {
      margin-right: 4px;
      font-size: 16px;
    }
    &:first-child {
      border-right: 1px #f6f6f6 solid;
    }
  }
}
</style>
