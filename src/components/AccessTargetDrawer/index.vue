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
          <div class="item success" @click="accessType = 'all'">
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
          <div class="item success" @click="accessType = 'can'">
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
            <div class="item success" @click="dVisible = true">
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
            <div class="item success" @click="uVisible = true">
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
          <div class="item danger" @click="accessType = 'cant'">
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
            <div class="item danger" @click="dVisible = true">
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
            <div class="item danger" @click="uVisible = true">
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
          name-key="username"
          :api="API_USERS.getUsersList"
          v-model="uVisible"
          :default-select-list="selectListObject[accessType].userList"
          @submit="(v) => submitFun(v, 'User')"
        />
        <SelectDialog
          name-key="name"
          avatarShape="square"
          :api="API_DEPARTMENT.getDeptList"
          v-model="dVisible"
          :default-select-list="selectListObject[accessType].departmentList"
          @submit="(v) => submitFun(v, 'Department')"
        />
      </div>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue';
import { SelectListObjectProp, useAccessTarget } from './useAccessTarget';
import SelectDialog from '@/components/SelectTarget/dialog.vue';
import { ACCESS_TYPE } from '@/constants/accessTarget';
import * as API_DEPARTMENT from '@/api/department';
import * as API_USERS from '@/api/users';
import { cloneDeep } from 'lodash-es';
interface ComponentProps {
  modelValue: boolean;
  defaultSelectListObject: SelectListObjectProp | null;
  type: ACCESS_TYPE;
}
const props = defineProps<ComponentProps>();
const emits = defineEmits(['closed', 'update:modelValue', 'submit', 'close']);

const {
  accessType,
  uVisible,
  dVisible,
  submitFun,
  selectListObject,
  drawerVisible,
  defaultSelectSet,
  submit
} = useAccessTarget(emits, props.type);

// 关闭之后
const closed = () => {
  emits('closed');
};

// 关闭
const close = () => {
  emits('update:modelValue', false);
  emits('close');
};

watchEffect(() => {
  drawerVisible.value = props.modelValue;
  if (props.defaultSelectListObject) {
    defaultSelectSet(cloneDeep(props.defaultSelectListObject));
  }
  accessType.value = props.type;
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
