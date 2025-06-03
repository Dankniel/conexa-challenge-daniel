import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import es from './locales/es.json';
import en from './locales/en.json';

const fallbackLanguage = 'es';

const getDeviceLanguage = () => {
  const deviceLocale = Localization.getLocales()[0];
  if (deviceLocale && deviceLocale.languageCode) {
    const deviceLanguage = deviceLocale.languageCode;
    return ['es', 'en'].includes(deviceLanguage) ? deviceLanguage : fallbackLanguage;
  }
  return fallbackLanguage;
};

const resources = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: fallbackLanguage,
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Exports
export { useI18n, useLanguageSwitch, translate } from './hooks';
export type { SupportedLanguages, LanguageResource, TranslationKeys, I18nConfig } from './types';
export default i18n; 