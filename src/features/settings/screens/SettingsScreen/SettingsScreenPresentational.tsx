import React, { memo } from 'react';
import { YStack, Text } from 'tamagui';
import { SettingsScreenPresentationalProps } from './types';
import { LogOut } from '@tamagui/lucide-icons';
import { I18nDemoContainer as I18nDemo } from '../../components/I18nDemo/I18nDemoContainer';
import { ButtonContainer as Button } from '../../../../components/Button/ButtonContainer';

const SettingsScreenPresentational = ({ 
  onLogoutPress, 
  loading,
  paddingTop,
  texts
}: SettingsScreenPresentationalProps) => {
  return (
    <YStack f={1} p="$4" gap="$6" backgroundColor="$purple1" paddingTop={paddingTop} testID="settings-screen-container">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center" mb="$4">
        {texts.title}
      </Text>
      
      <YStack flex={1} jc="center" gap="$6" testID="i18n-demo-container">
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
            {texts.logoutButton}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default SettingsScreenPresentational; 