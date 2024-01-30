<template>
  <div class="errorPage flex-center">
    <img class="img" src="@/assets/404.png" />
    <div class="code">404</div>
    <div class="desc">{{ $t('msg.errorPage.404') }}</div>
    <el-button class="btn" @click="toHome">{{
      $t('msg.errorPage.goHome')
    }}</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const toHome = () => {
  router.push('/');
};
</script>
<style lang="scss" scoped>
.errorPage {
  height: 100%;
  flex-direction: column;
  justify-content: unset;
  & > .img {
    width: 660px;
    margin-top: 40px;
  }
  & > .code {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }
  & > .desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    text-align: center;
  }
  & > .btn {
    margin-top: 20px;
  }
}
</style>
