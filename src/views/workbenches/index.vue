<template>
  <div class="container">
    <div class="headerContentBox">
      <div class="userBox">
        <el-avatar :size="60" :src="userInfo!.avatar || ''" />
        <div class="greetBox">
          <div class="title">
            {{ $t(`msg.workbenches.hello.${greeting}.text1`) }}
            {{ userInfo!.username || ''
            }}{{ $t(`msg.workbenches.hello.${greeting}.text2`)
            }}{{ $t(`msg.workbenches.hello.${greeting}.text3`) }}
          </div>
          <div class="desc" v-if="weatherInfo">
            今日{{ weatherInfo.weather }}，{{ weatherInfo.temperature }}℃，{{
              weatherInfo.winddirection
            }}风，风力{{ weatherInfo.windpower }}级 ，湿度{{
              weatherInfo.humidity
            }}%
          </div>
        </div>
      </div>
      <div class="countBox">
        <div class="item">
          <div class="title">{{ $t('msg.workbenches.toDo.title') }}</div>
          <div class="num">{{ todoListNum }}</div>
        </div>
        <div class="item">
          <div class="title">{{ $t('msg.workbenches.latestNotice') }}</div>
          <div class="num">{{ notificationNum }}</div>
        </div>
        <div class="item">
          <div class="title">{{ $t('msg.workbenches.project') }}</div>
          <div class="num">6</div>
        </div>
      </div>
    </div>
    <div class="bodyContentBox">
      <el-row :gutter="normalPadding">
        <el-col :span="16">
          <ProjectCard />
          <Notification class="mt-normal-padding" />
        </el-col>
        <el-col :span="8">
          <TodoList />
          <Card class="mt-normal-padding">
            <div class="imgCard">
              <img src="@/assets/workbenches.jpg" />
            </div>
          </Card>
          <Department v-if="userInfo!.department" class="mt-normal-padding" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/Card/index.vue';
import ProjectCard from './components/ProjectCard/index.vue';
import Notification from './components/Notification/index.vue';
import TodoList from './components/TodoList/index.vue';
import Department from './components/Department/index.vue';
import { useUserStore } from '@/store/modules/user';
import { getCssVariableValue } from '@/utils/css';
import { useMitt } from '@/hooks/useMitt';
import { WORKBENCHES_MITT_KEY } from '@/constants/mittKey';
import { getWeatherInfo, WeatherInfoProps } from '@/api/weather';
const { addListener } = useMitt(WORKBENCHES_MITT_KEY);
import { ref } from 'vue';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

let normalPadding: string | number = getCssVariableValue('--normal-padding');
normalPadding = parseFloat(normalPadding.replace('px', ''));

let greeting = ref<string>('');
const currentHour = new Date().getHours();

if (currentHour >= 6 && currentHour < 12) {
  greeting.value = 'morning';
} else if (currentHour >= 12 && currentHour < 19) {
  greeting.value = 'afternoon';
} else {
  greeting.value = 'night';
}

const todoListNum = ref<number>(0);
const notificationNum = ref<number>(0);
interface Prop {
  key: 'todoList' | 'project' | 'notification';
  value: number;
}
addListener((prop: Prop) => {
  if (prop.key === 'todoList') todoListNum.value = prop.value;
  if (prop.key === 'notification') notificationNum.value = prop.value;
});

const weatherLoading = ref(true);
const weatherInfo = ref<WeatherInfoProps>();
const getWeatherFun = async () => {
  weatherLoading.value = true;
  try {
    const { data } = await getWeatherInfo();
    weatherInfo.value = data;
  } catch (err) {
    console.log(err);
  } finally {
    weatherLoading.value = false;
  }
};
getWeatherFun();

defineOptions({
  name: 'Workbenches'
});
</script>
<style lang="scss" scoped>
.container {
  padding: var(--normal-padding);
  & > .headerContentBox {
    background-color: #fff;
    padding: var(--normal-padding) 30px var(--normal-padding) 20px;
    margin-bottom: var(--normal-padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #f0f0f0;
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
          letter-spacing: 1px;
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
    & .mt-normal-padding {
      margin-top: var(--normal-padding);
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
