<template>
  <div class="filterContainerComponent">
    <el-form
      v-model="formValue"
      :label-position="labelPosition || LABEL_POSITION"
      :label-width="labelWidth || LABEL_WIDTH"
      :size="size || ''"
    >
      <el-row :gutter="gutter || GUTTER">
        <el-col :span="col || COL" v-for="item in columns" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <slot :name="item.prop" v-bind="{ row: item, form: formValue }">
              <el-input
                v-if="!item.type || item.type === 'input'"
                v-model="formValue[item.prop]"
                :placeholder="item.placeholder || `请输入${item.label}`"
                clearable
              />
              <el-select
                v-model="formValue[item.prop]"
                v-else-if="item.type === 'select'"
                :placeholder="item.placeholder || `请选择${item.label}`"
                clearable
              >
                <el-option
                  v-for="option in item.selectOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <el-date-picker
                v-model="formValue[item.prop]"
                v-else-if="item.type === 'date'"
                :placeholder="item.placeholder || `请选择${item.label}`"
                type="date"
                value-format="yyyy-MM-dd"
                clearable
              />
            </slot>
          </el-form-item>
        </el-col>
        <el-col :span="col || COL">
          <el-form-item label-width="0">
            <el-button type="primary" @click="submit">{{
              $t('msg.search')
            }}</el-button>
            <el-button @click="reset">{{ $t('msg.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { ELEMENT_UI_SIZE } from '@/constants/app';
import { FilterColumnsProp } from './types';
import { pickBy } from 'lodash-es';
import { useDebounceFn } from '@vueuse/core';
// 栅格布局大小
const COL = 6;
// 栅格布局间距
const GUTTER = 16;
// Form labelPosition
const LABEL_POSITION = 'left';
// Form labelWidth
const LABEL_WIDTH = '70px';
interface ComponentProps {
  col?: number;
  labelWidth?: string;
  labelPosition?: 'left' | 'right';
  size?: ELEMENT_UI_SIZE;
  gutter?: number;
  columns: FilterColumnsProp[];
  submitFn?: (filterObject: any) => any;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['submit', 'update:modelValue', 'reset']);

// 搜索取值绑定
const formValue = reactive<any>({});
// 创建对象
watch(
  () => props.columns,
  () => {
    props.columns.forEach((item) => {
      formValue[item.prop] = undefined;
    });
  },
  { immediate: true }
);

// 双向绑定监听
watch(
  formValue,
  useDebounceFn(() => {
    emits('update:modelValue', filterNull(formValue));
  }, 300),
  { deep: true }
);

// 过滤空值
const filterNull = (val: any) => {
  return pickBy(
    val,
    (value) => value !== undefined && value !== null && value !== ''
  );
};

// 搜索按钮点击
const submit = () => {
  props.submitFn && props.submitFn(filterNull(formValue));
  emits('submit', filterNull(formValue));
};

// 重置按钮点击
const reset = () => {
  props.columns.forEach((item) => {
    formValue[item.prop] = undefined;
  });
  emits('reset');
};
</script>
<style lang="scss" scoped>
.filterContainerComponent {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid var(--normal-border-color);
  padding: var(--normal-padding);
  padding-bottom: 0;

  :deep(.el-form-item__content > div) {
    width: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: var(--normal-padding);
  }
}
</style>
