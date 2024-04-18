<template>
  <div class="AccessTargetDrawerComponent">
    <Teleport to="body">
      <el-drawer
        @closed="closed"
        @close="close"
        v-model="drawerVisible"
        title="发送对象"
      >
        <div class="listBox">
          <div class="item success" @click="changeAccessType('all')">
            <div class="leftBox">
              <div class="checkBox flex-center">
                <i class="ri-check-line" v-if="accessType === 'all'" />
              </div>
            </div>
            <div class="rightBox">
              <div class="titleBox">
                <div class="textBox">
                  <div class="title">公开</div>
                  <div class="desc">所有用户可见</div>
                </div>
              </div>
              <div class="descBox">
                <i class="ri-arrow-right-s-line" />
              </div>
            </div>
          </div>
          <div class="item success" @click="changeAccessType('can')">
            <div class="leftBox">
              <div class="checkBox flex-center">
                <i class="ri-check-line" v-if="accessType === 'can'" />
              </div>
            </div>
            <div class="rightBox">
              <div class="titleBox">
                <div class="textBox">
                  <div class="title">部分可见</div>
                </div>
              </div>
              <div class="descBox">
                <i class="ri-arrow-right-s-line" />
              </div>
            </div>
          </div>
          <div class="smallItem" v-if="accessType === 'can'">
            <div class="item success" @click="openDeptDialog">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择部门</div>
                    <div
                      class="desc"
                      v-if="!selectListObject.can.departmentList.length"
                    >
                      部门里的用户可见
                    </div>
                    <div class="selectActive" v-else>
                      {{ selectListObject.can.departmentNameString }}
                    </div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
            <div class="item success" @click="openUserDialog">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择用户</div>
                    <div
                      class="desc"
                      v-if="!selectListObject.can.userList.length"
                    >
                      选中的用户可见
                    </div>
                    <div class="selectActive" v-else>
                      {{ selectListObject.can.userNameString }}
                    </div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
          </div>
          <div class="item danger" @click="changeAccessType('cant')">
            <div class="leftBox">
              <div class="checkBox flex-center">
                <i class="ri-check-line" v-if="accessType === 'cant'" />
              </div>
            </div>
            <div class="rightBox">
              <div class="titleBox">
                <div class="textBox">
                  <div class="title">不给谁看</div>
                </div>
              </div>
              <div class="descBox">
                <i class="ri-arrow-right-s-line" />
              </div>
            </div>
          </div>
          <div class="smallItem" v-if="accessType === 'cant'">
            <div class="item danger" @click="openDeptDialog">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择部门</div>
                    <div
                      class="desc"
                      v-if="!selectListObject.cant.departmentList.length"
                    >
                      部门里的用户不可见
                    </div>
                    <div class="selectActive" v-else>
                      {{ selectListObject.cant.departmentNameString }}
                    </div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
            <div class="item danger" @click="openUserDialog">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择用户</div>
                    <div
                      class="desc"
                      v-if="!selectListObject.cant.userList.length"
                    >
                      选中的用户不可见
                    </div>
                    <div class="selectActive" v-else>
                      {{ selectListObject.cant.userNameString }}
                    </div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="drawerVisible = false">取消</el-button>
        </template>
      </el-drawer>
      <div v-if="accessType !== 'all'">
        <SelectDialog
          ref="selectUserRef"
          name-key="username"
          :api="API_USERS.getUsersList"
          :default-select-list="selectListObject[accessType].userList"
          @submit="(v) => submitFun(v, 'User')"
        />
        <SelectDialog
          ref="selectDeptRef"
          name-key="name"
          avatarShape="square"
          :api="API_DEPARTMENT.getDeptList"
          :default-select-list="selectListObject[accessType].departmentList"
          @submit="(v) => submitFun(v, 'Department')"
        />
      </div>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { SelectListObjectProp, useAccessTarget } from './useAccessTarget';
import SelectDialog from '@/components/SelectTarget/index.vue';
import { ACCESS_TYPE } from '@/constants/accessTarget';
import * as API_DEPARTMENT from '@/api/department';
import * as API_USERS from '@/api/users';
import { cloneDeep } from 'lodash-es';
interface ComponentProps {
  defaultSelectListObject: SelectListObjectProp | null;
  type: ACCESS_TYPE;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['closed', 'submit', 'close']);

const {
  selectUserRef,
  selectDeptRef,
  accessType,
  submitFun,
  selectListObject,
  drawerVisible,
  defaultSelectSet,
  submit,
  closed,
  close,
  openDrawer,
  closeDrawer,
  openUserDialog,
  openDeptDialog,
  changeAccessType
} = useAccessTarget(emits, props.type);

watch(
  () => props.defaultSelectListObject,
  (nV) => {
    if (nV) {
      defaultSelectSet(cloneDeep(nV));
    }
  },
  {
    immediate: true,
    deep: true
  }
);

export interface AccessTargetDrawerInstance {
  openDrawer: () => void;
  closeDrawer: () => void;
}

defineExpose({
  openDrawer,
  closeDrawer
});
</script>
<style lang="scss" scoped>
.flex-align-center {
  display: flex;
  align-items: center;
}
@mixin colorChange($color) {
  .checkBox > i {
    color: $color;
  }
  .selectActive {
    color: $color;
  }
}
.listBox {
  & .smallItem {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding-left: 50px;
    & > .item {
      padding: 10px 0 10px 14px;
    }
    &.danger {
      @include colorChange(#f56c6c);
    }
    &.success {
      @include colorChange(#67c23a);
    }
  }
  & .item {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-bottom: 1px var(--normal-border-color) solid;
    padding-bottom: 14px;
    &:not(:first-child) {
      padding-top: 14px;
    }
    &.danger {
      @include colorChange(#f56c6c);
    }
    &.success {
      @include colorChange(#67c23a);
    }
    & > .leftBox {
      @extend .flex-align-center;
      & > .checkBox {
        padding-left: 10px;
        padding-right: 14px;
        width: 20px;
        box-sizing: content-box;
        & > i {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    & > .rightBox {
      @extend .flex-align-center;
      justify-content: space-between;
      flex: 1;
      & > .titleBox {
        & > .textBox {
          & > .title {
            font-size: 14px;
          }
          & > .desc {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
          }
        }
      }
      & > .descBox {
        & > i {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
