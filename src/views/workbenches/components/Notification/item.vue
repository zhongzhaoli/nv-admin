<template>
  <div class="NoticeComponent">
    <div class="avatar">
      <el-avatar :size="34" :src="notice.avatar" />
    </div>
    <div class="content">
      <div class="message">
        <span class="author">{{ notice.author }}</span>
        <span>发送标题为</span>
        <span class="title">{{ notice.title }}</span>
        <span>的通知。</span>
      </div>
      <div class="datetime">{{ notice.timestamp }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface Notice {
  title: string;
  timestamp: string;
  avatar: string;
  author: string;
}

interface NoticeProps {
  notice: Notice;
}
defineProps<NoticeProps>();
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.NoticeComponent {
  display: flex;
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
    & > .datetime {
      color: #00000073;
      font-size: 12px;
      margin-top: 6px;
    }
  }
}
</style>
