<template>
  <Teleport to="body">
    <el-dialog
      :model-value="dialogVisible"
      :close-on-press-escape="false"
      width="40%"
      class="searchDialog"
      @opened="opened"
      @closed="handleClose"
    >
      <div class="dialogBody" v-if="dialogVisible">
        <div class="inputBox">
          <el-input
            ref="inputRef"
            v-model="searchWord"
            clearable
            :placeholder="$t('msg.navbar.search.placeholder')"
            @input="searchHandle"
          >
            <template #prefix>
              <i class="ri-search-line" />
            </template>
          </el-input>
        </div>
        <div class="resultBox">
          <div
            class="listBox"
            v-if="resultList && resultList.length"
            ref="scrollWrap"
          >
            <div
              v-for="(result, index) in resultList"
              ref="itemRefs"
              :key="index"
            >
              <Item
                :item="result"
                :index="index"
                :active="index === activeIndex"
                @mouseEnter="mouseEnter"
                @click="handleEnter"
              />
            </div>
          </div>
          <div class="noData flex-center" v-else>
            {{ $t('msg.navbar.search.noData') }}
          </div>
        </div>
        <div class="promptBox">
          <div class="key">
            <div class="icon flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8"
                />
              </svg>
            </div>
            <span>{{ $t('msg.navbar.search.confirm') }}</span>
          </div>
          <div class="key">
            <div class="icon flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  d="m112 244l144-144l144 144M256 120v292"
                />
              </svg>
            </div>
            <div class="icon flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  d="m112 268l144 144l144-144M256 392V100"
                />
              </svg>
            </div>
            <span>{{ $t('msg.navbar.search.shift') }}</span>
          </div>
          <div class="key">
            <div class="icon flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M1 7h6v2H3v2h4v2H3v2h4v2H1zm10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2"
                />
              </svg>
            </div>
            <span>{{ $t('msg.navbar.search.close') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useMenuSearch } from './useMenuSearch';
import Item from './item.vue';

defineProps<{ dialogVisible: boolean }>();
const emits = defineEmits(['close']);

const itemRefs = ref<HTMLElement[] | null>(null);
const scrollWrap = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLElement | null>();
const {
  resultList,
  searchWord,
  mouseEnter,
  searchHandle,
  activeIndex,
  handleEnter,
  handleClose
} = useMenuSearch(itemRefs, scrollWrap, emits);

// 焦点
const opened = () => {
  inputRef.value?.focus();
};
</script>
<style lang="scss" scoped>
.dialogBody {
  .inputBox {
    padding: 14px 14px 0 14px;
  }
  .resultBox {
    margin-top: 14px;
    & > .listBox {
      overflow: auto;
      max-height: 400px;
      padding: 0 14px;
      padding-bottom: 14px;
    }
    & > .noData {
      height: 100px;
      color: #969faf;
    }
  }
  .promptBox {
    border-top: 1px #eee solid;
    padding: 14px;
    display: flex;
    align-items: center;
    & > .key {
      &:not(:first-child) {
        margin-left: var(--normal-padding);
      }
      display: flex;
      align-items: center;
      & > .icon {
        box-shadow:
          inset 0 -2px #cdcde6,
          inset 0 0 1px 1px #fff,
          0 1px 2px 1px #1e235a66;
        width: 20px;
        height: 18px;
        margin-right: 0.4em;
        padding-bottom: 2px;
        font-size: 16px;
        border-radius: 2px;
      }
      & > span {
        font-size: 12px;
      }
    }
  }
}
</style>
