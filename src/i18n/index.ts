import { createI18n, type I18nOptions } from 'vue-i18n';
import { useAppStore } from '@/store/modules/app';
import { App, computed } from 'vue';

export interface I18nProps {
  en: {
    [key: string]: Object;
  };
  zh: {
    [key: string]: Object;
  };
}

export let i18n: ReturnType<typeof createI18n>;

const createI18nOptions = async (): Promise<I18nOptions> => {
  const appStore = useAppStore();
  const language = computed(() => appStore.language);
  const defaultLocal = await import(`./langs/${language.value}.ts`);
  const message = defaultLocal.default ?? {};
  return {
    legacy: false,
    globalInjection: true,
    locale: language.value,
    messages: {
      [language.value]: message
    }
  };
};

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
