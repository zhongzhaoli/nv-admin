<template>
  <div class="AccessTargetDrawerComponent">
    <Teleport to="body">
      <el-drawer @closed="closed" :model-value="drawerOpen" title="发送对象">
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
            <div class="item" @click="dVisible = true">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择部门</div>
                    <div class="desc">部门里的用户可见</div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
            <div class="item" @click="uVisible = true">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择用户</div>
                    <div class="desc">选中的用户可见</div>
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
            <div class="item" @click="dVisible = true">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择部门</div>
                    <div class="desc">部门里的用户可见</div>
                  </div>
                </div>
                <div class="descBox">
                  <i class="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
            <div class="item" @click="uVisible = true">
              <div class="rightBox">
                <div class="titleBox">
                  <div class="textBox">
                    <div class="title">选择用户</div>
                    <div class="desc">选中的用户可见</div>
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
          <el-button type="primary">保存</el-button>
          <el-button @click="closed">取消</el-button>
        </template>
      </el-drawer>
      <SelectDialog
        type="User"
        :visible="uVisible"
        @closed="uVisible = false"
        title="选择用户"
      />
      <SelectDialog
        type="Department"
        :visible="dVisible"
        @closed="dVisible = false"
        title="选择部门"
      />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAccessTarget } from './useAccessTarget';
import SelectDialog from '@/components/SelectTarget/dialog.vue';
interface ComponentProps {
  drawerOpen: boolean;
}
defineProps<ComponentProps>();
const emits = defineEmits(['closed']);

const { accessType } = useAccessTarget();

// 关闭
const closed = () => {
  emits('closed');
};

// 选择用户/部门
const uVisible = ref<boolean>(false);
const dVisible = ref<boolean>(false);
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
