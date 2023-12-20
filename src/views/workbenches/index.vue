<template>
  <div class="container">
    <div class="headerContentBox">
      <div class="userBox">
        <el-avatar
          :size="60"
          src="https://resource.lstaer.com/283df2f7-dc52-4a0a-8110-88cd38746dff?imageView2/1/w/100/h/100"
        />
        <div class="greetBox">
          <div class="title">晚上好 Custer，开始您一天的工作吧！</div>
          <div class="desc">今日晴，20℃ - 32℃！</div>
        </div>
      </div>
      <div class="countBox">
        <div class="item">
          <div class="title">待办</div>
          <div class="num">10</div>
        </div>
        <div class="item">
          <div class="title">通知</div>
          <div class="num">5</div>
        </div>
        <div class="item">
          <div class="title">项目</div>
          <div class="num">7</div>
        </div>
      </div>
    </div>
    <div class="bodyContentBox">
      <el-row :gutter="20">
        <el-col :span="16">
          <ProjectCard />
          <Notification class="mt-20" />
        </el-col>
        <el-col :span="8">
          <TodoList />
          <Card class="mt-20">
            <div class="imgCard">
              <img src="@/assets/workbenches.jpg" />
            </div>
          </Card>
          <Department class="mt-20" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from './components/Card/index.vue';
import ProjectCard from './components/ProjectCard/index.vue';
import Notification from './components/Notification/index.vue';
import TodoList from './components/TodoList/index.vue';
import Department from './components/Department/index.vue';
defineOptions({
  name: 'Workbenches'
});
</script>
<style lang="scss" scoped>
.container {
  & > .headerContentBox {
    background-color: #fff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .userBox {
      display: flex;
      align-items: center;
      & > .greetBox {
        margin-left: 20px;
        & > .title {
          font-size: 16px;
          font-weight: bold;
        }
        & > .desc {
          color: #00000073;
          font-size: 14px;
          margin-top: 6px;
        }
      }
    }
    & > .countBox {
      & > .item {
        text-align: center;
        &:not(:first-child) {
          margin-left: 40px;
        }
        display: inline-block;
        & > .title {
          font-size: 14px;
          color: #00000073;
          letter-spacing: 2px;
        }
        & > .num {
          font-size: 20px;
          font-weight: bold;
          margin-top: 4px;
        }
      }
    }
  }
  & > .bodyContentBox {
    padding: 20px;
    & .mt-20 {
      margin-top: 20px;
    }
    & .imgCard {
      & > img {
        width: 100%;
        vertical-align: bottom;
      }
    }
  }
}
</style>
