import { i18n } from '@/i18n';

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

export function useI18n() {
  const { t, ...methods } = i18n.global;
  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    return (
      t as (arg0: string, ...arg: I18nTranslationRestParameters) => string
    )(key, ...(arg as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    t: tFn
  };
}
