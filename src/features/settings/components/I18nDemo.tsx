import { YStack, XStack, Text, Card } from 'tamagui';
import { useI18n } from '../../../i18n';
import { LanguageSwitcherContainer as LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcherContainer';
import { Globe } from '@tamagui/lucide-icons';

const I18nDemo = () => {
  const { t } = useI18n();

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
          {t('settings.language')}
        </Text>
      </XStack>
      
      <Text fontSize="$4" color="$purple10" textAlign="center" mb="$5">
        {t('settings.languageDescription')}
      </Text>

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
          {t('settings.i18nDemo')}
        </Text>
        
        <XStack jc="space-between" ai="center">
          <Text fontSize="$3" color="$purple10" fontWeight="500">Común:</Text>
          <Text fontSize="$3" color="$purple12" fontWeight="600">{t('common.loading')}</Text>
        </XStack>
        
        <XStack jc="space-between" ai="center">
          <Text fontSize="$3" color="$purple10" fontWeight="500">Navegación:</Text>
          <Text fontSize="$3" color="$purple12" fontWeight="600">{t('navigation.home')}</Text>
        </XStack>
        
        <XStack jc="space-between" ai="center">
          <Text fontSize="$3" color="$purple10" fontWeight="500">Autenticación:</Text>
          <Text fontSize="$3" color="$purple12" fontWeight="600">{t('auth.login')}</Text>
        </XStack>
        
        <XStack jc="space-between" ai="center">
          <Text fontSize="$3" color="$purple10" fontWeight="500">Validación:</Text>
          <Text fontSize="$3" color="$purple12" fontWeight="600">{t('validation.required')}</Text>
        </XStack>
        
        <XStack jc="space-between" ai="center">
          <Text fontSize="$3" color="$purple10" fontWeight="500">Mensaje:</Text>
          <Text fontSize="$3" color="$purple12" fontWeight="600">{t('messages.welcomeMessage')}</Text>
        </XStack>
      </YStack>
    </Card>
  );
};

export { I18nDemo }; 