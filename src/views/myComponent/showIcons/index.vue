<template>
  <div class="showIconPage">
    <div class="marginBox">
      <div
        class="item"
        @click="copy(item)"
        v-for="item in showList"
        :key="item"
      >
        <div class="box">
          <div class="absolute">
            <i :class="`ri-${item}`" />
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pageBox">
      <el-pagination
        v-model:current-page="page"
        style="margin-top: 0"
        layout="total, prev, pager, next"
        background
        :total="iconList.length"
        :page-size="pageSize"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import IconJson from 'remixicon/fonts/remixicon.glyph.json';
import { ref } from 'vue';
import useClipboard from 'vue-clipboard3';
const iconList = ref<string[]>(Object.keys(IconJson));
const showList = ref<string[]>([]);
const pageSize = 45;
const page = ref(1);

defineOptions({
  name: 'MyCompIcons'
});

const { toClipboard } = useClipboard();

const copy = (name: string) => {
  toClipboard(`<i class="ri-${name}"></i>`);
  ElMessage.success('复制成功');
};

showList.value = iconList.value.slice(
  (page.value - 1) * pageSize,
  page.value * pageSize
);

const pageChange = () => {
  showList.value = iconList.value.slice(
    (page.value - 1) * pageSize,
    page.value * pageSize
  );
  console.log(showList.value);
};
// 分页 一页 50个
</script>
<style lang="scss" scoped>
.showIconPage {
  padding: var(--normal-padding);
  & > .marginBox {
    margin: 0 -4px;
    display: flex;
    flex-wrap: wrap;
    & > .item {
      width: calc(11.1111111% - calc(var(--normal-padding)));
      margin: 0 calc(var(--normal-padding) / 2) var(--normal-padding);
      & > .box {
        padding-top: 100%;
        position: relative;
        background-color: #fff;
        border: 1px #eaeaea solid;
        & > .absolute {
          position: absolute;
          padding: 8px;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          & > i {
            font-size: 30px;
            color: #000;
          }
          & > span {
            color: #777;
            text-align: center;
            margin-top: 10px;
          }
        }
      }
    }
  }
  & > .pageBox {
    display: flex;
    justify-content: center;
  }
}
</style>
