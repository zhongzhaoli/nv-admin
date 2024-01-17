<template>
  <Card size="small" :title="title">
    <template #action>
      <el-tag :type="actionTagType" disable-transitions>{{
        actionTagText
      }}</el-tag>
    </template>
    <div class="bodyCard">
      <div class="countBox">
        <span class="prefix">{{ prefix }}</span>
        <span>
          <CountUp :endVal="count" :suffix="suffix" separator="," />
        </span>
      </div>
      <img :src="svg" :alt="title" />
    </div>
    <template #footer>
      <div class="footerCard">
        <div>总{{ title }}：</div>
        <div>
          <CountUp :endVal="totalCount" separator="," />
          {{ unit }}
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
import CountUp from '@/components/CountUp/index.vue';
export interface DataCardProps {
  title: string;
  actionTagText: string;
  actionTagType: 'success' | 'info' | 'warning' | 'danger' | '';
  svg: any;
  count: number;
  prefix?: string;
  suffix?: string;
  totalCount: number;
  unit?: string;
}
defineProps<DataCardProps>();
</script>
<style lang="scss" scoped>
.bodyCard {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .countBox {
    & > .prefix {
      margin-right: 4px;
    }
    & > span {
      font-size: 22px;
      color: var(--normal-text-color-black);
    }
  }
  & > img {
    width: 50px;
    height: 50px;
  }
}
.footerCard {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--normal-text-color-sliver);
}
</style>
