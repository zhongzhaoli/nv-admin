import { createApp } from 'vue';
import App from './App.vue';
import { loadPlugins } from '@/plugins';
import store from '@/store';
import router from '@/router';
import { setupI18n } from '@/i18n/index';
import '@/router/permission';

import 'remixicon/fonts/remixicon.css';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';

async function bootstrap() {
  const app = createApp(App);
  // 加载插件
  loadPlugins(app);
  // Pinia
  app.use(store);
  // Router
  app.use(router);
  // i18n
  await setupI18n(app);
  app.mount('#app');
}

bootstrap();
