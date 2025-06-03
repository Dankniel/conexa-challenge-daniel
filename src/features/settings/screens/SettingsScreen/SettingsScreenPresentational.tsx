import React from 'react';
import { YStack, Text } from 'tamagui';
import { SettingsScreenPresentationalProps } from './types';
import { LogOut } from '@tamagui/lucide-icons';
import { useI18n } from '../../../../i18n';
import { I18nDemo } from '../../components/I18nDemo';
import { ButtonContainer as Button } from '../../../../components/Button/ButtonContainer';

const SettingsScreenPresentational = ({ 
  onLogoutPress, 
  loading,
  paddingTop
}: SettingsScreenPresentationalProps) => {
  const { t } = useI18n();

  return (
    <YStack f={1} p="$4" gap="$6" backgroundColor="$purple1" paddingTop={paddingTop}>
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center" mb="$4">
        {t('settings.title')}
      </Text>
      
      <YStack flex={1} jc="center" gap="$6">
        {/* Componente de demo i18n */}
        <I18nDemo />
      </YStack>

      <YStack gap="$3">
        <Button 
          onPress={onLogoutPress}
          variant="danger"
          size="large"
          fullWidth={true}
          loading={loading}
          disabled={loading}
          icon={loading ? undefined : <LogOut />}
        >
          <Text fontWeight="bold">
            {loading ? t('settings.loggingOut') : t('auth.logout')}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default SettingsScreenPresentational; 