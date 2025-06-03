import React, { memo } from 'react';
import { YStack, XStack, Text, Card, Avatar } from 'tamagui';
import { User, MapPin, Phone, Globe } from '@tamagui/lucide-icons';
import { UserItemPresentationalProps } from './types';

const UserItemPresentational = memo(({ user, fullName, onPress }: UserItemPresentationalProps) => {
  return (
    <Card
      backgroundColor="$purple2"
      borderColor="$purple4"
      borderWidth={1}
      p="$4"
      mb="$3"
      elevate
      hoverStyle={{
        backgroundColor: "$purple3",
        borderColor: "$purple5"
      }}
      pressStyle={{
        backgroundColor: "$purple3",
        scale: 0.98
      }}
      onPress={onPress}
      animation="bouncy"
    >
      <XStack ai="center" gap="$3">
        <Avatar circular size="$5" backgroundColor="$purple6">
          <User size={24} color="$purple1" />
        </Avatar>
        
        <YStack flex={1} gap="$2">
          <Text fontSize="$6" color="$purple12" fontWeight="700">
            {fullName}
          </Text>
          
          <YStack gap="$1">
            <XStack ai="center" gap="$2">
              <Globe size={14} color="$purple10" />
              <Text fontSize="$3" color="$purple11" flex={1} numberOfLines={1}>
                {user.email}
              </Text>
            </XStack>
            
            <XStack ai="center" gap="$2">
              <Phone size={14} color="$purple10" />
              <Text fontSize="$3" color="$purple11" flex={1} numberOfLines={1}>
                {user.phone}
              </Text>
            </XStack>
            
            <XStack ai="center" gap="$2">
              <MapPin size={14} color="$purple10" />
              <Text fontSize="$3" color="$purple11" flex={1} numberOfLines={1}>
                {user.company.name}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </XStack>
    </Card>
  );
});

UserItemPresentational.displayName = 'UserItemPresentational';

export default UserItemPresentational; 