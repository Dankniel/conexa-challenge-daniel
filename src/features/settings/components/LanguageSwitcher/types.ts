import type { SupportedLanguages } from '../../../../i18n/types';

export interface LanguageSwitcherContainerProps {
  children: React.ReactNode;
}

export interface LanguageSwitcherPresentationalProps {
  children: React.ReactNode;
}

export interface LanguageButtonContainerProps {
  language: SupportedLanguages;
  children: React.ReactNode;
  onPress?: () => void;
}

export interface LanguageButtonPresentationalProps {
  onPress: () => void;
  isSelected: boolean;
  children: React.ReactNode;
}

export interface LanguageToggleContainerProps {
  children?: React.ReactNode;
}

export interface LanguageTogglePresentationalProps {
  onPress: () => void;
  currentLanguage: string;
  children?: React.ReactNode;
}

export interface LanguageTextContainerProps {
  translationKey: string;
}

export interface LanguageTextPresentationalProps {
  text: string;
} 