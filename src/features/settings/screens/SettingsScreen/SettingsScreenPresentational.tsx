import React from 'react';
import { YStack, Text, Button, Card, XStack, Spinner } from 'tamagui';
import { SettingsScreenPresentationalProps } from './types';
import { LogOut, Settings, User, Bell } from '@tamagui/lucide-icons';

const SettingsScreenPresentational = ({ 
  text, 
  onLogoutPress, 
  loading 
}: SettingsScreenPresentationalProps) => {
  return (
    <YStack f={1} p="$4" gap="$4" backgroundColor="$purple1">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center" mb="$4">
        {text}
      </Text>
      
      <YStack gap="$3" flex={1}>
        <Card
          backgroundColor="$purple2"
          borderColor="$purple4"
          borderWidth={1}
          p="$4"
          elevate
        >
          <XStack ai="center" gap="$3" mb="$3">
            <User size={20} color="$purple8" />
            <Text fontSize="$5" color="$purple12" fontWeight="600">
              Perfil de Usuario
            </Text>
          </XStack>
          <Text fontSize="$3" color="$purple10">
            Administra tu información personal y preferencias de cuenta
          </Text>
        </Card>

        <Card
          backgroundColor="$purple2"
          borderColor="$purple4"
          borderWidth={1}
          p="$4"
          elevate
        >
          <XStack ai="center" gap="$3" mb="$3">
            <Bell size={20} color="$purple8" />
            <Text fontSize="$5" color="$purple12" fontWeight="600">
              Notificaciones
            </Text>
          </XStack>
          <Text fontSize="$3" color="$purple10">
            Configura qué notificaciones deseas recibir
          </Text>
        </Card>

        <Card
          backgroundColor="$purple2"
          borderColor="$purple4"
          borderWidth={1}
          p="$4"
          elevate
        >
          <XStack ai="center" gap="$3" mb="$3">
            <Settings size={20} color="$purple8" />
            <Text fontSize="$5" color="$purple12" fontWeight="600">
              Configuración General
            </Text>
          </XStack>
          <Text fontSize="$3" color="$purple10">
            Ajustes de la aplicación y preferencias generales
          </Text>
        </Card>
      </YStack>

      <YStack mt="$4" gap="$3">
        <Button 
          onPress={onLogoutPress} 
          size="$5" 
          width="100%" 
          disabled={loading}
          backgroundColor="$red8"
          borderWidth={0}
          fontWeight="bold"
          fontSize="$5"
          hoverStyle={{
            backgroundColor: "$red9",
            scale: 1.02
          }}
          pressStyle={{
            backgroundColor: "$red7",
            scale: 0.98
          }}
          disabledStyle={{
            backgroundColor: "$red4"
          }}
          icon={loading ? () => <Spinner size="small" color="$red1" /> : LogOut}
        >
          <Text color="$red1" fontWeight="bold">
            {loading ? 'Cerrando Sesión...' : 'Cerrar Sesión'}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default SettingsScreenPresentational; 