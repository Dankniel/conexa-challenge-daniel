import React from 'react';
import { XStack, Text, Button } from 'tamagui';
import { Heart } from '@tamagui/lucide-icons';
import { FavoritesCounterPresentationalProps } from './types';

const FavoritesCounterPresentational = ({ 
  countText, 
  onPress
}: FavoritesCounterPresentationalProps) => {
  return (
    <Button
      size="$3"
      variant="outlined"
      borderColor="$red9"
      backgroundColor="$red2"
      onPress={onPress}
    >
      <XStack alignItems="center" gap="$2">
        <Heart size={16} color="$red10" fill="$red10" />
        <Text fontSize="$3" color="$red11" fontWeight="600">
          {countText}
        </Text>
      </XStack>
    </Button>
  );
};

export default FavoritesCounterPresentational; 