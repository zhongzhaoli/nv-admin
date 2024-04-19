import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
// import { viteMockServe } from 'vite-plugin-mock';

export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    },
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      // host设置为true，可根据ip的变化，用ip进行访问
      host: true,
      // 设置端口号
      port: 5173,
      // 允许跨域访问
      cors: true,
      // 不自动打开浏览器
      open: false,
      // 端口被占用时，不直接退出
      strictPort: false,
      // 预热常用文件
      warmup: {
        clientFiles: ['./src/{views,components}/**/*.{vue,ts}']
      }
    },
    plugins: [
      vue()
      // viteMockServe({
      //   mockPath: './mock'
      // })
    ]
  };
};
