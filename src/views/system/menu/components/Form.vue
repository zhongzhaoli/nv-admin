<template>
  <el-form label-position="top">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="上级菜单">
          <el-tree-select
            ref="treeselect"
            style="width: 100%"
            v-model="formValue.pid"
            :data="menus"
            check-strictly
            :render-after-expand="false"
            @node-click="treeSelectChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="类型">
          <el-select
            v-model="formValue.type"
            style="width: 100%"
            placeholder="请选择菜单类型"
          >
            <el-option
              v-for="item in menuTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图标">
          <IconPicker style="width: 100%" v-model="formValue.icon" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="路径">
          <el-input v-model="formValue.path" placeholder="请输入菜单路径" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="标题">
          <el-input v-model="formValue.title" placeholder="请输入菜单标题" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="名称">
          <el-input v-model="formValue.name" placeholder="请输入菜单名称" />
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="组件路径">
          <el-input
            v-model="formValue.component"
            placeholder="请输入组件路径"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="排序">
          <el-input-number :min="1" v-model="formValue.sort" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <div class="flex-center fl-column radioBtn">
          <div class="el-form-item__label customLabel">是否显示</div>
          <el-radio-group v-model="formValue.hidden">
            <el-radio-button :label="false">是</el-radio-button>
            <el-radio-button :label="true">否</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-center fl-column radioBtn">
          <div class="el-form-item__label customLabel">是否缓存</div>
          <el-radio-group v-model="formValue.keepAlive">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-center fl-column radioBtn">
          <div class="el-form-item__label customLabel">历史记录固定</div>
          <el-radio-group v-model="formValue.affix">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { ROUTE_TYPE, ROUTE_TYPE_FX, ROUTE_TYPE_LABEL } from '@/constants/route';
import IconPicker from '@/components/IconPicker/index.vue';
import { flattenNestedArray } from '@/utils/index';

export interface MenusProps {
  label: string;
  value: string | number;
  type: ROUTE_TYPE;
  children: MenusProps[];
}

interface ComponentProps {
  modelValue: any;
  menus: MenusProps[];
}

const props = defineProps<ComponentProps>();

const treeselect = ref();
const menuTypeList = ref<{ label: string; value: string }[]>([]);
const formValue = ref<any>({});

// 上级菜单选择回调
const treeSelectChange = (menu: MenusProps) => {
  generateTypeList(menu.type);
};

// 生成菜单类型列表
const generateTypeList = (type: ROUTE_TYPE) => {
  const fx = ROUTE_TYPE_FX[type];
  menuTypeList.value = fx.reduce(
    (pre, next) => {
      pre.push({
        label: ROUTE_TYPE_LABEL[next],
        value: next
      });
      return pre;
    },
    [] as { label: string; value: string }[]
  );
};

watch(
  () => props.modelValue,
  (nV) => {
    formValue.value = { ...nV, ...nV.meta };
    // 生成对应的菜单类型列表
    const flatMenus = flattenNestedArray<MenusProps>(props.menus, 'children');
    const menuItem = flatMenus.find(
      (item) => item.value === formValue.value.pid
    );
    if (menuItem) {
      generateTypeList(menuItem.type);
    }
  },
  { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.radioBtn {
  margin-bottom: 18px;
}
</style>
