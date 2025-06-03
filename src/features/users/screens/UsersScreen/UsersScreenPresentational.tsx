import React from 'react';
import { YStack, Text, Card, XStack, Avatar } from 'tamagui';
import { UsersScreenPresentationalProps } from './types';
import { User } from '@tamagui/lucide-icons';

const UsersScreenPresentational = ({ text }: UsersScreenPresentationalProps) => {
  const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'María García', email: 'maria@example.com' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com' },
  ];

  return (
    <YStack f={1} p="$4" gap="$4" backgroundColor="$purple1">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center" mb="$4">
        {text}
      </Text>
      
      <YStack gap="$3" flex={1}>
        {mockUsers.map((user) => (
          <Card
            key={user.id}
            backgroundColor="$purple2"
            borderColor="$purple4"
            borderWidth={1}
            p="$4"
            elevate
            hoverStyle={{
              backgroundColor: "$purple3",
              borderColor: "$purple5"
            }}
            pressStyle={{
              backgroundColor: "$purple3",
              scale: 0.98
            }}
          >
            <XStack ai="center" gap="$3">
              <Avatar circular size="$4" backgroundColor="$purple6">
                <User size={20} color="$purple1" />
              </Avatar>
              <YStack flex={1} gap="$1">
                <Text fontSize="$5" color="$purple12" fontWeight="600">
                  {user.name}
                </Text>
                <Text fontSize="$3" color="$purple10">
                  {user.email}
                </Text>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
};

export default UsersScreenPresentational; 