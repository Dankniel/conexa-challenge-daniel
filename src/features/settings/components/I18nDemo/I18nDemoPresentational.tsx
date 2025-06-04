import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { Globe } from '@tamagui/lucide-icons';
import { LanguageSwitcherContainer as LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcherContainer';
import { I18nDemoPresentationalProps } from './types';

const I18nDemoPresentational = React.memo(({
  title,
  description,
  savedLanguageLabel,
  selectedLanguageDisplay,
  demoTitle,
  demoTexts
}: I18nDemoPresentationalProps) => {
  return (
    <Card
      backgroundColor="$purple2"
      borderColor="$purple4"
      borderWidth={1}
      p="$5"
      elevate
      borderRadius="$6"
    >
      <XStack ai="center" gap="$3" mb="$4" jc="center">
        <Globe size={24} color="$purple8" />
        <Text fontSize="$6" color="$purple12" fontWeight="700">
          {title}
        </Text>
      </XStack>
      
      <Text fontSize="$4" color="$purple10" textAlign="center" mb="$3">
        {description}
      </Text>

      {/* Idioma actual desde Redux */}
      <XStack jc="center" ai="center" mb="$4">
        <Text fontSize="$3" color="$purple9" fontWeight="500">
          {savedLanguageLabel}: 
        </Text>
        <Text fontSize="$3" color="$purple12" fontWeight="700" ml="$2">
          {selectedLanguageDisplay}
        </Text>
      </XStack>

      {/* Language Switcher */}
      <YStack gap="$4" ai="center" mb="$5">
        <LanguageSwitcher>
          <LanguageSwitcher.Button language="es">🇪🇸 Español</LanguageSwitcher.Button>
          <LanguageSwitcher.Button language="en">🇺🇸 English</LanguageSwitcher.Button>
        </LanguageSwitcher>
      </YStack>

      {/* Demo Texts */}
      <YStack gap="$3" backgroundColor="$purple1" p="$4" borderRadius="$4">
        <Text fontSize="$4" color="$purple11" fontWeight="600" textAlign="center" mb="$3">
          {demoTitle}
        </Text>
        
        {demoTexts.map((item, index) => (
          <XStack key={index} jc="space-between" ai="center">
            <Text fontSize="$3" color="$purple10" fontWeight="500">{item.label}:</Text>
            <Text fontSize="$3" color="$purple12" fontWeight="600">{item.value}</Text>
          </XStack>
        ))}
      </YStack>
    </Card>
  );
});

I18nDemoPresentational.displayName = 'I18nDemoPresentational';

export { I18nDemoPresentational }; 