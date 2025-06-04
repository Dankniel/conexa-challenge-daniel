import React from 'react';
import { Text, XStack } from 'tamagui';
import { ButtonContainer as Button } from '../../../../components/Button/ButtonContainer';
import {
  LanguageSwitcherPresentationalProps,
  LanguageButtonPresentationalProps,
  LanguageTogglePresentationalProps,
  LanguageTextPresentationalProps,
} from './types';

const LanguageSwitcherPresentational = ({ children }: LanguageSwitcherPresentationalProps) => {
  return (
    <XStack gap="$3" ai="center" jc="center">
      {children}
    </XStack>
  );
};

const LanguageButtonPresentational = ({ 
  onPress, 
  isSelected, 
  children 
}: LanguageButtonPresentationalProps) => {
  return (
    <Button
      onPress={onPress}
      variant={isSelected ? 'primary' : 'secondary'}
      size="medium"
    >
      {children}
    </Button>
  );
};

const LanguageTogglePresentational = ({ 
  onPress, 
  currentLanguage, 
  children 
}: LanguageTogglePresentationalProps) => {
  return (
    <Button
      onPress={onPress}
      variant="primary"
      size="medium"
    >
      {children || currentLanguage.toUpperCase()}
    </Button>
  );
};

const LanguageTextPresentational = ({ text }: LanguageTextPresentationalProps) => {
  return <Text>{text}</Text>;
};

LanguageSwitcherPresentational.displayName = 'LanguageSwitcherPresentational';
LanguageButtonPresentational.displayName = 'LanguageButtonPresentational';
LanguageTogglePresentational.displayName = 'LanguageTogglePresentational';
LanguageTextPresentational.displayName = 'LanguageTextPresentational';

export {
  LanguageSwitcherPresentational,
  LanguageButtonPresentational,
  LanguageTogglePresentational,
  LanguageTextPresentational,
}; 