<template>
  <div class="IconPickerComponent">
    <el-popover trigger="click" width="400">
      <template #reference>
        <el-input
          readonly
          v-model="formValue"
          style="width: 100%"
          placeholder="请选择图标"
        >
          <template #prepend v-if="formValue">
            <i :class="formValue" />
          </template>
        </el-input>
      </template>
      <template #default>
        <el-row :gutter="10">
          <el-col :span="20" style="margin-bottom: 10px">
            <el-input
              v-model="keyWord"
              placeholder="查询想要的图标"
              @change="searchFun"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="width: 100%" @click="searchFun"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt-10">
          <el-col :span="6" v-for="item in showList" :key="item">
            <div class="iconBox" @click="handle(item)">
              <i :class="`ri-${item}`" />
            </div>
          </el-col>
        </el-row>
        <el-pagination
          style="margin-top: 0"
          layout="total, prev, next"
          background
          :total="total"
          :current-page="pageNum"
          :page-size="pageSize"
          @current-change="pageChange"
        />
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import IconJson from 'remixicon/fonts/remixicon.glyph.json';
import { cloneDeep } from 'lodash-es';
const iconList = ref<string[]>(Object.keys(IconJson));
const showList = ref<string[]>([]);

const formValue = ref<string>('');
const keyWord = ref<string>('');
const pageNum = ref<number>(1);
const pageSize = ref<number>(16);
const total = ref<number>(iconList.value.length);

interface ComponentProps {
  modelValue: string | undefined;
}

const props = defineProps<ComponentProps>();
const emits = defineEmits(['update:modelValue']);
watch(
  () => props.modelValue,
  () => {
    formValue.value = props.modelValue || '';
  },
  { immediate: true }
);

const searchFun = () => {
  const searchList = iconList.value.filter((icon) =>
    icon.includes(keyWord.value)
  );
  total.value = searchList.length;
  getShowList(searchList);
};

const handle = (val: string) => {
  emits('update:modelValue', `ri-${val}`);
};

const pageChange = (val: number) => {
  pageNum.value = val;
  getShowList();
};

const getShowList = (list = iconList.value) => {
  const newList = cloneDeep(list);
  let start = (pageNum.value - 1) * 16;
  showList.value = newList.splice(start, 16);
};

getShowList();
</script>
<style lang="scss" scoped>
.iconBox {
  border: 1px #eaeaea solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px 0;
  font-size: 24px;
}
</style>
