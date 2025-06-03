import { useTranslation } from 'react-i18next';
import i18n from './index';

export const useI18n = () => {
  const { t, i18n: i18nInstance } = useTranslation();

  const changeLanguage = (language: string) => {
    i18nInstance.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18nInstance.language;
  };

  const isLanguageRTL = () => {
    return i18nInstance.dir() === 'rtl';
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    isLanguageRTL,
    i18n: i18nInstance,
  };
};

export const useLanguageSwitch = () => {
  const { changeLanguage, getCurrentLanguage } = useI18n();

  const switchToSpanish = () => changeLanguage('es');
  const switchToEnglish = () => changeLanguage('en');
  
  const toggleLanguage = () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  };

  return {
    switchToSpanish,
    switchToEnglish,
    toggleLanguage,
    currentLanguage: getCurrentLanguage(),
  };
};

// Helper para obtener traducciones fuera de componentes React
export const translate = (key: string, options?: any) => {
  return i18n.t(key, options);
}; 