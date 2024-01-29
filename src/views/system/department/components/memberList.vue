<template>
  <div class="memberListComponent" v-loading="memberListLoading">
    <div class="memberList" v-if="!memberListLoading">
      <div class="item" @click="openSelectTarget">
        <div class="addItem">
          <div class="add flex-center">
            <i class="ri-add-line" />
          </div>
          <div class="text">添加成员</div>
        </div>
      </div>
      <div class="item" v-for="item in memberList" :key="item.id">
        <MemberItem
          @delete-member="deleteMember"
          :avatar="item.avatar"
          :name="item.username"
          :id="item.id"
        />
      </div>
    </div>
    <Teleport to="body">
      <SelectTarget
        ref="selectUserRef"
        name-key="username"
        :api="API_USERS.getUsersList"
        :submit-loading="selectUserLoading"
        :default-select-list="memberList"
        @submit="submitAddUserList"
      />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import * as API_DEPARTMENT from '@/api/department/index';
import * as API_USERS from '@/api/users/index';
import MemberItem from './memberItem.vue';
import SelectTarget from '@/components/SelectTarget/index.vue';
import { type SelectTargetInstance } from '@/components/SelectTarget/useSelectTarget';
import { useMessageBox } from '@/hooks/useMessageBox';
import { ElMessage } from 'element-plus';
import { unref } from 'vue';

interface ComponentProps {
  id: string | number;
}

const props = defineProps<ComponentProps>();

// 获取部门成员列表
const memberListLoading = ref<boolean>(false);
const memberList = ref<any[]>([]);
const getMemberList = async () => {
  memberListLoading.value = true;
  try {
    const { data } = await API_DEPARTMENT.getDeptMemberList<any[]>(props.id);
    memberList.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    memberListLoading.value = false;
  }
};

// 添加成员
const selectUserRef = ref<SelectTargetInstance | null>(null);
const selectUserLoading = ref<boolean>(false);
const submitAddUserList = async (list: any[]) => {
  try {
    selectUserLoading.value = true;
    await API_DEPARTMENT.addDeptMember({
      ids: list.map((item: any) => item.id)
    });
    ElMessage.success('操作成功');
    selectUserRef.value && selectUserRef.value.closeDialog();
    // TODO：动态添加
  } catch (err) {
    console.log(err);
  } finally {
    selectUserLoading.value = false;
  }
};
const openSelectTarget = () => {
  if (selectUserLoading.value) return;
  selectUserRef.value && selectUserRef.value.openDialog();
};

// 移除成员
const deleteMember = (mid: string | number) => {
  useMessageBox('确定移除此成员吗？', async () => {
    await API_DEPARTMENT.deleteDeptMember(props.id, mid);
    ElMessage.success('操作成功');
    const index = unref(memberList).findIndex((item) => item.id === mid);
    if (index > -1) memberList.value.splice(index, 1);
  });
};

defineExpose({ getMemberList });

// 首次打开
getMemberList();
</script>
<style lang="scss" scoped>
.memberListComponent {
  height: 340px;
  & > .memberList {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    & > .item {
      width: calc(25% - 12px);
      box-sizing: content-box;
      padding: 6px;
      & > .addItem {
        cursor: pointer;
        border: 1px solid var(--normal-border-color);
        border-radius: 4px;
        display: flex;
        padding: 12px 10px;
        flex-direction: column;
        align-items: center;
        &:hover {
          & > div.text {
            color: var(--el-color-primary);
          }
          & > .add {
            color: var(--el-color-primary);
            border-color: var(--el-color-primary);
          }
        }
        & > .add {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          border-radius: 50%;
          border: 1px dashed rgba(0, 0, 0, 0.1);
          font-size: 20px;
          transition: all 0.3s;
          & > .loading-circle {
            width: 20px;
            height: 20px;
            border-width: 2px;
          }
        }
        & > div.text {
          font-size: 14px;
          margin-top: 5px;
          text-align: center;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>
