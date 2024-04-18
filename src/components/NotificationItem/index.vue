<template>
  <div class="NoticeComponent" @click="toDetail">
    <div class="leftBox">
      <div class="avatar">
        <el-avatar :size="34" :src="notice.createUser.avatar" />
      </div>
      <div class="content">
        <div class="message">
          <span class="author">{{ notice.createUser.realName }}</span>
          <span>{{ $t('msg.notification.shortText1') }}</span>
          <span class="title">{{ notice.title }}</span>
          <span>{{ $t('msg.notification.shortText2') }}</span>
        </div>
        <div class="bottom">
          <div class="time">{{ notice.timestamp }}</div>
          <!-- <div class="read">
            <div class="read" v-if="notice.read">
              {{ $t('msg.notification.read') }}
            </div>
            <div class="unRead" v-else>
              <div />
              {{ $t('msg.notification.unRead') }}
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="rightBox">
      <div class="navbarFunItem" @click="toDetail">
        <i class="ri-arrow-right-s-line" />
      </div>
      <slot name="right" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
export interface Notice {
  id: string | number;
  title: string;
  timestamp: string;
  createUser: {
    avatar: string;
    realName: string;
  };
  createTime: string;
  read: boolean;
}

interface ComponentProps {
  notice: Notice;
}
const props = defineProps<ComponentProps>();

const toDetail = () => {
  router.push(`/notification/detail/${props.notice.id}`);
};
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.NoticeComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .leftBox {
    display: flex;
    align-items: center;
    & > .avatar {
      position: relative;
    }

    & > .content {
      margin-left: 20px;
      width: calc(100% - 20px - 34px);
      & > .message {
        font-size: 14px;
        color: var(--normal-text-color-sliver);
        @include text-ellipsis(1);
        & > .author {
          margin-right: 4px;
          font-weight: bold;
          color: #000;
        }
        & > .title {
          margin: 0 4px;
          font-weight: bold;
          color: var(--el-color-primary-light-3);
          cursor: pointer;
          &:hover {
            color: var(--el-color-primary-light-5);
          }
        }
      }
      & > .bottom {
        display: flex;
        align-items: center;
        color: #00000073;
        font-size: 12px;
        margin-top: 6px;
        & > .read {
          margin-left: 10px;
          & > .unRead {
            display: flex;
            align-items: center;
            & > div {
              width: 6px;
              height: 6px;
              background-color: var(--el-color-danger);
              border-radius: 50%;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
  & > .rightBox {
    display: flex;
    align-items: center;
    & .navbarFunItem {
      width: 30px;
      height: 30px;
      & > i {
        font-size: 22px;
        color: #999;
      }
    }
  }
}
</style>
