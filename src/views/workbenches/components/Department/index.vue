<template>
  <Card :title="$t('msg.workbenches.department.title')">
    <template #default>
      <div class="cardBody">
        <div class="posterBox">
          <el-avatar
            :size="80"
            shape="square"
            src="/src/assets/departmentAvatar.png"
          />
          <div class="textBox">
            <div class="title">前端开发部</div>
            <div class="desc">我们的团队OUR TEAM.</div>
          </div>
        </div>
        <div class="usersBox">
          <div class="userList">
            <el-avatar
              v-for="(item, index) in userList"
              :key="index"
              :size="35"
              :style="{ '--i': index }"
              :src="item.avatar"
            />
            <div class="more" :style="{ '--i': userList.length }">
              <i class="ri-more-fill" />
            </div>
          </div>
          <div class="text">
            <el-button type="primary" link
              >{{ $t('msg.workbenches.department.count1') }} 20
              {{ $t('msg.workbenches.department.count2') }}</el-button
            >
          </div>
        </div>
      </div>
    </template>
    <!-- <template #footer>
      <div class="contactBox">
        <div>
          <i class="ri-chat-smile-3-line" />
          <span>发信息</span>
        </div>
        <div>
          <i class="ri-file-copy-2-line" />
          <span>文件共享</span>
        </div>
      </div>
    </template> -->
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';

const userList: Array<{ avatar: string }> = [
  {
    avatar: 'https://resource.lstaer.com/1f967c66-5966-496d-beca-25b58622632a'
  },
  {
    avatar: 'https://resource.lstaer.com/1f9ce64a-81dc-4147-beca-f7a72861b647'
  },
  {
    avatar: 'https://resource.lstaer.com/2057c545-31e2-48d4-b3f7-fb80602ffab1'
  },
  {
    avatar: 'https://resource.lstaer.com/26541b3c-a630-4014-ae0d-67a59624e56d'
  },
  {
    avatar: 'https://resource.lstaer.com/26238892-aebf-41ef-ac9c-eac4119b7044'
  }
];
</script>
<style lang="scss" scoped>
.cardBody {
  padding: 24px;
  & > .posterBox {
    display: flex;
    border-bottom: 1px #f6f6f6 solid;
    padding-bottom: 24px;
    & > .textBox {
      margin-left: 16px;
      & > .title {
        font-size: 16px;
        font-weight: bold;
      }
      & > .desc {
        font-size: 14px;
        color: #00000073;
        margin-top: 4px;
      }
    }
  }
  & > .usersBox {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .userList {
      position: relative;
      height: 35px;
      & > .el-avatar {
        position: absolute;
        left: calc(22px * var(--i));
        border: 2px #fff solid;
      }
      & > .more {
        color: #999;
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #eaeaea;
        border: 2px #fff solid;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: calc(22px * var(--i));
      }
    }
  }
}
.contactBox {
  height: 40px;
  background-color: #fff;
  & > div {
    display: inline-flex;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.3s;
    color: var(--normal-text-color-sliver);
    &:hover {
      color: var(--el-color-primary-light-5);
    }
    & > i {
      margin-right: 4px;
      font-size: 16px;
    }
    &:first-child {
      border-right: 1px #f6f6f6 solid;
    }
  }
}
</style>
