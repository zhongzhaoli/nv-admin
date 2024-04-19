<template>
  <div class="container">
    <div class="opacityBox" />
    <div class="loginBox">
      <div class="bgBox">
        <img src="@/assets/login_bg.png" alt="" />
      </div>
      <div class="rightBox">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <div class="formBox">
          <el-form>
            <el-form-item>
              <el-input
                v-model="loginPayload.username"
                :placeholder="$t('msg.login.usernamePlaceholder')"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                type="password"
                v-model="loginPayload.password"
                :placeholder="$t('msg.login.passwordPlaceholder')"
              />
              <div class="checkBox">
                <el-checkbox v-model="remember">
                  <span class="remember">{{ $t('msg.login.rememberMe') }}</span>
                </el-checkbox>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="w-100"
                type="primary"
                auto-insert-space
                :loading="loading"
                @click="loginHandle"
              >
                {{ $t('msg.login.btnText') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="copyright">
          Copyright © 2022-2023 Luosen tech All Right Reserved.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, unref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { LoginDto } from '@/api/login';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
// 按钮loading
const loading = ref<boolean>(false);
// 登录信息载核
const loginPayload = reactive<LoginDto>({
  username: '',
  password: ''
});
// 记住我
const remember = ref(false);
// 登录操作
const loginHandle = async () => {
  loading.value = true;
  try {
    await userStore.login(loginPayload);
    ElMessage.success('登录成功');
    if (unref(remember)) {
      localStorage.setItem('accountRemember', JSON.stringify(loginPayload));
    } else {
      localStorage.removeItem('accountRemember');
    }
    router.push('/');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const accountRemember = localStorage.getItem('accountRemember');
  if (accountRemember) {
    loginPayload.username = JSON.parse(accountRemember).username;
    loginPayload.password = JSON.parse(accountRemember).password;
  }
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/src/assets/bg.jpg');
  background-size: cover;
  position: relative;
  & > .opacityBox {
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  & > .loginBox {
    width: 850px;
    height: 500px;
    // border: 1px #f0f0f0 solid;
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    overflow: hidden;
    background-color: #fff;
    z-index: 3;
    & > .bgBox {
      width: 500px;
      height: 500px;
      background-color: #fbfbfb;
      & > img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
      }
    }
    & > .rightBox {
      width: 350px;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      & > .logo {
        width: 180px;
        & > img {
          width: 100%;
          vertical-align: bottom;
        }
      }
      & > .formBox {
        margin-top: 40px;
        width: 250px;
        & .w-100 {
          width: 100%;
        }
        & .checkBox {
          margin-top: 10px;
          & .remember {
            color: #626262;
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
      & > .copyright {
        font-size: 12px;
        color: #cecece;
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        left: 0;
        transform: scale(0.8);
      }
    }
  }
}
</style>
