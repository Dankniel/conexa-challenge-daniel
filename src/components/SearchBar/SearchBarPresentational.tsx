import React from 'react';
import { XStack, Input, Button } from 'tamagui';
import { Search, X } from '@tamagui/lucide-icons';
import { SearchBarPresentationalProps } from './types';

const SearchBarPresentational = ({ 
  value, 
  onChangeText, 
  onClear, 
  placeholder,
  showClearButton
}: SearchBarPresentationalProps) => {
  return (
    <XStack 
      alignItems="center" 
      backgroundColor="$background" 
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      paddingHorizontal="$3"
      paddingVertical="$2"
      gap="$2"
    >
      <Search size={20} color="$gray10" />
      
      <Input
        flex={1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        backgroundColor="transparent"
        borderWidth={0}
        fontSize="$4"
        paddingHorizontal="$0"
        placeholderTextColor="$gray10"
      />
      
      {showClearButton && (
        <Button
          size="$2"
          variant="outlined"
          circular
          icon={X}
          onPress={onClear}
          color="$gray10"
          borderWidth={0}
          backgroundColor="transparent"
        />
      )}
    </XStack>
  );
};

export default SearchBarPresentational; 