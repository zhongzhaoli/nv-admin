import { type App } from 'vue';
import { loadAntDesign } from './ant-design';

export function loadPlugins(app: App) {
  loadAntDesign(app);
}
