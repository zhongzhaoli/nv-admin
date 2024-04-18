<template>
  <template v-if="item.children && item.children.length">
    <el-sub-menu :index="item.path" teleported>
      <template #title>
        <el-icon>
          <i class="re-icon" :class="item?.meta?.icon || ''" />
        </el-icon>
        <span>{{ item?.meta?.title || '' }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :item="child"
        :isTop="true"
        :key="child.path"
      />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="item.path">
      <el-icon>
        <i class="re-icon" v-if="isTop" :class="item?.meta?.icon || ''" />
      </el-icon>
      <span>{{ item?.meta?.title || '' }}</span>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

interface Props {
  item: RouteRecordRaw;
  isTop: boolean;
}

defineProps<Props>();
</script>
<style lang="scss" scoped></style>
