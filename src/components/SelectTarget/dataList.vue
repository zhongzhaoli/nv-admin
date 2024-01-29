<template>
  <div class="SelectTargetDataComponent">
    <div class="searchBox">
      <el-input
        v-model="searchKey"
        @change="searchFun"
        clearable
        placeholder="请输入名字"
      >
        <template #prefix>
          <i class="ri-search-line" />
        </template>
      </el-input>
    </div>
    <Scroll
      :loadingMore="loadingMore"
      :disabled="false"
      @load="loadMore"
      v-loading="loading"
    >
      <div class="dataList">
        <div
          class="dataItem"
          v-for="item in list"
          :key="item.id"
          @click.prevent="clickItem(item)"
        >
          <div class="dataItemLeft">
            <div class="avatar" v-if="item.avatar">
              <el-avatar :src="item.avatar" :size="32" :shape="avatarShape" />
            </div>
            <span class="username">{{ item[uNameKey] }}</span>
          </div>
          <div class="dataItemRight">
            <div class="checkBox">
              <el-checkbox v-model="item.checked" @change="checkBoxChange" />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup lang="ts">
import Scroll from './scroll.vue';
import { useDataList } from './useDataList';
import { watchEffect } from 'vue';
import { cloneDeep } from 'lodash-es';
import { AVATAR_SHAPE } from '@/constants/app';

interface ComponentProps {
  nameKey: string;
  api: Function;
  defaultSelectList: any[];
  avatarShape: AVATAR_SHAPE;
}

const props = defineProps<ComponentProps>();
const emits = defineEmits(['change']);

const {
  uNameKey,
  loading,
  list,
  uApi,
  loadingMore,
  searchKey,
  defaultList,
  loadMore,
  searchFun,
  getListFun,
  checkBoxChange,
  clickItem,
  handleDefaultSelect
} = useDataList(emits);

watchEffect(() => {
  uNameKey.value = props.nameKey;
  defaultList.value = cloneDeep(props.defaultSelectList);
  uApi.value = props.api;
  if (props.defaultSelectList) {
    handleDefaultSelect();
  }
});

getListFun();
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.SelectTargetDataComponent {
  & > .searchBox {
    padding: 20px;
  }
  .dataList {
    padding: 0 20px;

    .dataItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ebeef5;
      cursor: pointer;
      .dataItemLeft {
        flex: 1;
        display: flex;
        align-items: center;
        & > .avatar {
          margin-right: 14px;
        }
        & > .username {
          @include text-ellipsis(1);
        }
      }
      .dataItemRight {
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
