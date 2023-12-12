import { createApp } from 'vue';
import App from './App.vue';
import { loadPlugins } from '@/plugins';

const app = createApp(App);
// 加载插件
loadPlugins(app);

app.mount('#app');
