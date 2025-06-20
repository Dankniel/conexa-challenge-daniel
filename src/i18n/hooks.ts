import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { AppDispatch } from '../store/store';
import { selectSelectedLanguage } from '../store/selectors/authSelectors';
import { saveLanguageToStorage, setSelectedLanguage } from '../store/slices/authSlice';
import { SupportedLanguages } from './types';
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

// Nuevo hook que integra Redux con i18n
export const useLanguageWithRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const { t, getCurrentLanguage } = useI18n();

  // Sincronizar i18n con Redux cuando selectedLanguage cambie
  useEffect(() => {
    const currentLang = getCurrentLanguage();
    if (selectedLanguage && currentLang !== selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, getCurrentLanguage]);

  const changeLanguage = useCallback((language: SupportedLanguages) => {
    // Solo actualizar si es diferente al actual
    if (selectedLanguage !== language) {
      // 1. Primero actualizar Redux sincrónicamente
      dispatch(setSelectedLanguage(language));
      
      // 2. Cambiar en i18n inmediatamente después
      i18n.changeLanguage(language);
      
      // 3. Guardar en AsyncStorage de manera async (no bloqueante)
      dispatch(saveLanguageToStorage(language));
    }
  }, [selectedLanguage, dispatch]);

  const switchToSpanish = useCallback(() => changeLanguage('es'), [changeLanguage]);
  const switchToEnglish = useCallback(() => changeLanguage('en'), [changeLanguage]);
  
  const toggleLanguage = useCallback(() => {
    const newLang = selectedLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  }, [selectedLanguage, changeLanguage]);

  return {
    t,
    selectedLanguage,
    currentLanguage: selectedLanguage, // Para compatibilidad con el componente existente
    changeLanguage,
    switchToSpanish,
    switchToEnglish,
    toggleLanguage,
    getCurrentLanguage,
  };
};

// Helper para obtener traducciones fuera de componentes React
export const translate = (key: string, options?: any) => {
  return i18n.t(key, options);
};

// Hook para inicialización del i18n (usar solo una vez en AppNavigator)
export const useI18nInitialization = () => {
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Solo sincronizar después de que Redux se haya inicializado completamente
    if (!hasInitialized.current && selectedLanguage) {
      const currentI18nLang = i18n.language;
      if (currentI18nLang !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage);
        hasInitialized.current = true;
      } else if (currentI18nLang === selectedLanguage) {
        // Ya están sincronizados
        hasInitialized.current = true;
      }
    }
  }, [selectedLanguage]);
}; 