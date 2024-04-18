<template>
  <div class="selectTagetPage">
    <el-row :gutter="normalPadding">
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>选择用户 - 单选</h2>
          <el-button @click="openUserO">开始选择</el-button>
          <div style="margin-top: 10px; color: #999">
            <span>结果：{{ JSON.stringify(selectUserOList) }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>选择用户 - 多选</h2>
          <el-button @click="openUserM">开始选择</el-button>
          <div style="margin-top: 10px; color: #999">
            <span>结果：{{ JSON.stringify(selectUserMList) }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="mt">
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>选择部门 - 单选</h2>
          <el-button @click="openDeptO">开始选择</el-button>
          <div style="margin-top: 10px; color: #999">
            <span>结果：{{ JSON.stringify(selectDeptOList) }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>选择部门 - 多选</h2>
          <el-button @click="openDeptM">开始选择</el-button>
          <div style="margin-top: 10px; color: #999">
            <span>结果：{{ JSON.stringify(selectDeptMList) }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <SelectDialog
      ref="selectUserRef"
      name-key="username"
      :multiple="false"
      :api="API_USERS.getUsersList"
      @submit="(v) => submitFun(v, 'selectUserRef')"
    />
    <SelectDialog
      ref="selectUserMRef"
      name-key="username"
      :api="API_USERS.getUsersList"
      @submit="(v) => submitFun(v, 'selectUserMRef')"
    />
    <SelectDialog
      ref="selectDeptRef"
      name-key="name"
      :multiple="false"
      avatarShape="square"
      :api="API_DEPARTMENT.getDeptList"
      @submit="(v) => submitFun(v, 'selectDeptRef')"
    />
    <SelectDialog
      ref="selectDeptMRef"
      name-key="name"
      avatarShape="square"
      :api="API_DEPARTMENT.getDeptList"
      @submit="(v) => submitFun(v, 'selectDeptMRef')"
    />
  </div>
</template>
<script setup lang="ts">
import SelectDialog from '@/components/SelectTarget/index.vue';
import * as API_USERS from '@/api/users';
import * as API_DEPARTMENT from '@/api/department';
import { ref } from 'vue';
import { getCssVariableValue } from '@/utils/css';

const selectUserRef = ref();
const selectUserMRef = ref();
const selectDeptRef = ref();
const selectDeptMRef = ref();

let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));

const selectUserOList = ref<{} | any[]>([]);
const selectUserMList = ref<{} | any[]>([]);
const selectDeptOList = ref<{} | any[]>([]);
const selectDeptMList = ref<{} | any[]>([]);

const openUserO = () => {
  selectUserRef.value.openDialog();
};
const openUserM = () => {
  selectUserMRef.value.openDialog();
};

const openDeptO = () => {
  selectDeptRef.value.openDialog();
};
const openDeptM = () => {
  selectDeptMRef.value.openDialog();
};

const submitFun = (v: any, type: string) => {
  if (type === 'selectUserRef') {
    selectUserRef.value.closeDialog();
    if (Array.isArray(v)) {
      selectUserOList.value = v.map((item: any) => {
        return {
          username: item.username
        };
      }) as any[];
    } else {
      selectUserOList.value = {
        username: v.username
      };
    }
  }
  if (type === 'selectUserMRef') {
    selectUserMRef.value.closeDialog();
    if (Array.isArray(v)) {
      selectUserMList.value = v.map((item: any) => {
        return {
          username: item.username
        };
      }) as any[];
    } else {
      selectUserMList.value = {
        username: v.username
      };
    }
  }
  if (type === 'selectDeptRef') {
    selectDeptRef.value.closeDialog();
    if (Array.isArray(v)) {
      selectDeptOList.value = v.map((item: any) => {
        return {
          name: item.name
        };
      }) as any[];
    } else {
      selectDeptOList.value = {
        name: v.name
      };
    }
  }
  if (type === 'selectDeptMRef') {
    selectDeptMRef.value.closeDialog();
    if (Array.isArray(v)) {
      selectDeptMList.value = v.map((item: any) => {
        return {
          name: item.name
        };
      }) as any[];
    } else {
      selectDeptMList.value = {
        name: v.name
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.selectTagetPage {
  padding: var(--normal-padding);
  & h2 {
    padding: 0;
    margin-top: 0;
    margin-bottom: var(--normal-padding);
  }
  & .mt {
    margin-top: var(--normal-padding);
  }
}
</style>
