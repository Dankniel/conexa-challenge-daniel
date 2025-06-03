import React from 'react';
import { YStack, Text } from 'tamagui';
import { HomeScreenPresentationalProps } from './types';

const HomeScreenPresentational = ({ text }: HomeScreenPresentationalProps) => {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4" backgroundColor="$purple1">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center">
        {text}
      </Text>
      
      <YStack width="100%" maxWidth={300} gap="$4" mt="$6">
        <Text fontSize="$6" color="$purple11" textAlign="center" lineHeight="$6">
          Bienvenido a la aplicación
        </Text>
        
        <Text fontSize="$4" color="$purple10" textAlign="center" lineHeight="$5">
          Esta es tu pantalla de inicio. Puedes navegar por las diferentes secciones usando el menú inferior.
        </Text>
      </YStack>
    </YStack>
  );
};

export default HomeScreenPresentational; 