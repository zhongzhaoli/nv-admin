import { createApp } from 'vue';
import App from './App.vue';
import { loadPlugins } from '@/plugins';
import store from '@/store';

const app = createApp(App);
// 加载插件
loadPlugins(app);
// Pinia
app.use(store);

app.mount('#app');
