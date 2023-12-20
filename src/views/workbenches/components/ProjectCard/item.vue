<template>
  <div class="projectItem">
    <div class="title">
      <div class="avatar">
        <i :class="item.icon" :style="{ color: item.iconColor || '#000' }" />
      </div>
      <span class="name">{{ item.title }}</span>
    </div>
    <div class="desc">{{ item.desc }}</div>
    <div class="author">
      <div>{{ item.author }}</div>
      <div>{{ item.date }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface ProjectItemProps {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  author: string;
  date: string;
}
defineProps<{ item: ProjectItemProps }>();
</script>
<style lang="scss" scoped>
.projectItem {
  padding: 24px;
  box-shadow:
    1px 0 0 0 #f0f0f0,
    0 1px 0 0 #f0f0f0,
    1px 1px 0 0 #f0f0f0,
    1px 0 0 0 #f0f0f0 inset,
    0 1px 0 0 #f0f0f0 inset;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    position: relative;
    z-index: 1;
    box-shadow:
      0 1px 2px -2px rgba(0, 0, 0, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.05),
      0 5px 12px 4px rgba(0, 0, 0, 0.05);
  }
  & > .title {
    display: flex;
    align-items: center;
    height: 30px;
    & > .avatar {
      font-size: 30px;
    }
    & > span.name {
      font-size: 16px;
      margin-left: 14px;
    }
  }
  & > .desc {
    font-size: 14px;
    color: #00000073;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  & > .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    & > div {
      font-size: 14px;
      color: #00000073;
    }
  }
}
</style>
