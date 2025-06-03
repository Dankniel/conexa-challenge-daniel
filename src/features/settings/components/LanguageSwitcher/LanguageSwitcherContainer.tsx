import { useLanguageSwitch, useI18n } from '../../../../i18n';
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
  const { changeLanguage, getCurrentLanguage } = useI18n();
  const isSelected = getCurrentLanguage() === language;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      changeLanguage(language);
    }
  };

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
  const { toggleLanguage, currentLanguage } = useLanguageSwitch();

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