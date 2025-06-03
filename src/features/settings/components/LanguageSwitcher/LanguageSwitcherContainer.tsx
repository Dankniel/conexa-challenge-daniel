import { useCallback } from 'react';
import { useLanguageWithRedux, useI18n } from '../../../../i18n';
import {
  LanguageSwitcherPresentational,
  LanguageButtonPresentational,
  LanguageTogglePresentational,
  LanguageTextPresentational,
} from './LanguageSwitcherPresentational';
import {
  LanguageSwitcherContainerProps,
  LanguageButtonContainerProps,
  LanguageToggleContainerProps,
  LanguageTextContainerProps,
} from './types';

const LanguageSwitcherContainer = ({ children }: LanguageSwitcherContainerProps) => {
  return <LanguageSwitcherPresentational>{children}</LanguageSwitcherPresentational>;
};

const LanguageButtonContainer = ({ 
  language, 
  children, 
  onPress 
}: LanguageButtonContainerProps) => {
  const { changeLanguage, selectedLanguage } = useLanguageWithRedux();
  const isSelected = selectedLanguage === language;

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else {
      changeLanguage(language);
    }
  }, [onPress, changeLanguage, language]);

  return (
    <LanguageButtonPresentational
      onPress={handlePress}
      isSelected={isSelected}
    >
      {children}
    </LanguageButtonPresentational>
  );
};

const LanguageToggleContainer = ({ children }: LanguageToggleContainerProps) => {
  const { toggleLanguage, currentLanguage } = useLanguageWithRedux();

  return (
    <LanguageTogglePresentational
      onPress={toggleLanguage}
      currentLanguage={currentLanguage}
    >
      {children}
    </LanguageTogglePresentational>
  );
};

const LanguageTextContainer = ({ translationKey }: LanguageTextContainerProps) => {
  const { t } = useI18n();
  const text = t(translationKey);

  return <LanguageTextPresentational text={text} />;
};

// Compound component pattern
LanguageSwitcherContainer.Button = LanguageButtonContainer;
LanguageSwitcherContainer.Toggle = LanguageToggleContainer;
LanguageSwitcherContainer.Text = LanguageTextContainer;

export { LanguageSwitcherContainer }; 