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
            <el-avatar :src="item.avatar" :size="32" :shape="avatarShape" />
            <span class="username">{{ item[nameKey] }}</span>
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
import * as API_USERS from '@/api/users';
import * as API_DEPARTMENT from '@/api/department';
import Scroll from './scroll.vue';
import { SelectTargetType } from './dialog.vue';
import { useDataList } from './useDataList';

interface ComponentProps {
  type: SelectTargetType;
  defaultSelectList: any[];
}

const props = defineProps<ComponentProps>();
const emits = defineEmits(['change']);

const {
  nameKey,
  avatarShape,
  loading,
  api,
  list,
  loadingMore,
  searchKey,
  loadMore,
  searchFun,
  getListFun,
  checkBoxChange,
  clickItem
} = useDataList(emits, props.defaultSelectList);

if (props.type === 'User') {
  api.value = API_USERS.getUsersList;
  nameKey.value = 'username';
  avatarShape.value = 'circle';
} else if (props.type === 'Department') {
  api.value = API_DEPARTMENT.getDeptList;
  nameKey.value = 'name';
  avatarShape.value = 'square';
}

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
        & > .username {
          margin-left: 14px;
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
