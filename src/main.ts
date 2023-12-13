import { createApp } from 'vue';
import App from './App.vue';
import { loadPlugins } from '@/plugins';
import store from '@/store';
import router from '@/router';

import 'remixicon/fonts/remixicon.css';
import '@/styles/index.scss';

const app = createApp(App);
// 加载插件
loadPlugins(app);
// Pinia
app.use(store);
// Router
app.use(router);

app.mount('#app');
