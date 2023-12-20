<template>
  <Card title="项目">
    <template #action>
      <el-button type="primary" link>查看更多</el-button>
    </template>
    <el-row>
      <el-col :span="8" v-for="(item, index) in listData" :key="index">
        <ProjectItem :item="item" />
      </el-col>
    </el-row>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import ProjectItem, { type ProjectItemProps } from './item.vue';

const listData: ProjectItemProps[] = [
  {
    icon: 'ri-github-fill',
    iconColor: '#000',
    title: 'Github',
    desc: '不要等待机会，而要创造机会。',
    author: '开源组',
    date: '2021-04-01'
  },
  {
    icon: 'ri-vuejs-fill',
    iconColor: '#3fb27f',
    title: 'Vue',
    desc: '现在的你决定将来的你。',
    author: '算法组',
    date: '2021-04-01'
  },
  {
    icon: 'ri-html5-fill',
    iconColor: '#e18525',
    title: 'Html5',
    desc: '没有什么才能比努力更重要。',
    author: '上班摸鱼',
    date: '2021-04-01'
  },
  {
    icon: 'ri-angularjs-fill',
    iconColor: '#bf0c2c',
    title: 'Angular',
    desc: '热情和欲望可以突破一切难关。',
    author: 'UI',
    date: '2021-04-01'
  },
  {
    icon: 'ri-reactjs-fill',
    iconColor: '#00d8ff',
    title: 'React',
    desc: '健康的身体是实现目标的基石。',
    author: '技术牛',
    date: '2021-04-01'
  },
  {
    icon: 'ri-javascript-fill',
    iconColor: '#ebd94e',
    title: 'Js',
    desc: '路是走出来的，而不是想出来的。',
    author: '架构组',
    date: '2021-04-01'
  }
];
</script>
<style lang="scss" scoped></style>
