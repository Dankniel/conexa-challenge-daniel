import React from 'react';
import { useI18n, useLanguageWithRedux } from '../../../../i18n';
import { I18nDemoPresentational } from './I18nDemoPresentational';

const I18nDemoContainer = () => {
  const { t } = useI18n();
  const { selectedLanguage } = useLanguageWithRedux();

  // Lógica: formatear el idioma seleccionado
  const formatLanguageDisplay = (lang: string) => {
    return lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English';
  };

  // Lógica: preparar los textos de demostración
  const getDemoTexts = () => {
    return [
      {
        label: t('demo.common'),
        value: t('common.loading')
      },
      {
        label: t('demo.navigation'),
        value: t('navigation.home')
      },
      {
        label: t('demo.authentication'),
        value: t('auth.login')
      },
      {
        label: t('demo.validation'),
        value: t('validation.required')
      },
      {
        label: t('demo.message'),
        value: t('messages.welcomeMessage')
      }
    ];
  };

  return (
    <I18nDemoPresentational
      title={t('settings.language')}
      description={t('settings.languageDescription')}
      savedLanguageLabel={t('settings.savedLanguage')}
      selectedLanguageDisplay={formatLanguageDisplay(selectedLanguage)}
      demoTitle={t('settings.i18nDemo')}
      demoTexts={getDemoTexts()}
    />
  );
};

export { I18nDemoContainer }; 