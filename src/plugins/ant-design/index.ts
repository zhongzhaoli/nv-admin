import { type App } from 'vue';
import Antd from 'ant-design-vue';

export function loadAntDesign(app: App) {
  app.use(Antd);
}
