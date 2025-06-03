import React from 'react';
import { LoginScreenPresentationalProps } from './types';
import { YStack, XStack, Text, Button, Input, Label, Spinner } from 'tamagui';
import { Eye, EyeOff } from '@tamagui/lucide-icons';

const LoginScreenPresentational = ({ 
  text, 
  onLoginPress, 
  username, 
  password, 
  onUsernameChange, 
  onPasswordChange, 
  loading, 
  error,
  showPassword,
  onTogglePasswordVisibility,
  texts
}: LoginScreenPresentationalProps) => {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4" backgroundColor="$purple1">
      <Text fontSize="$8" color="$purple12" mb="$6" fontWeight="bold" textAlign="center">
        {text}
      </Text>

      <YStack width="100%" maxWidth={300} gap="$3">
        <Label htmlFor="username" color="$purple11" fontSize="$4" fontWeight="600">
          {texts.username}
        </Label>
        <Input 
          id="username" 
          placeholder={texts.usernamePlaceholder} 
          size="$4" 
          value={username} 
          onChangeText={onUsernameChange}
          backgroundColor="$purple2"
          borderColor="$purple4"
          color="$purple12"
          placeholderTextColor="$gray8"
          focusStyle={{
            borderColor: "$purple8",
            backgroundColor: "$purple3"
          }}
        />
      </YStack>

      <YStack width="100%" maxWidth={300} gap="$3">
        <Label htmlFor="password" color="$purple11" fontSize="$4" fontWeight="600">
          {texts.password}
        </Label>
        <XStack alignItems="center" gap="$2">
          <Input 
            id="password" 
            placeholder={texts.passwordPlaceholder} 
            size="$4" 
            secureTextEntry={!showPassword}
            value={password} 
            onChangeText={onPasswordChange}
            flex={1}
            backgroundColor="$purple2"
            borderColor="$purple4"
            color="$purple12"
            placeholderTextColor="$gray8"
            focusStyle={{
              borderColor: "$purple8",
              backgroundColor: "$purple3"
            }}
          />
          <Button
            size="$4"
            variant="outlined"
            onPress={onTogglePasswordVisibility}
            icon={showPassword ? EyeOff : Eye}
            backgroundColor="$purple3"
            borderColor="$purple5"
            hoverStyle={{
              backgroundColor: "$purple4",
              borderColor: "$purple6"
            }}
            pressStyle={{
              backgroundColor: "$purple5",
              scale: 0.95
            }}
          />
        </XStack>
      </YStack>

      {error && (
        <Text color="$red10" fontSize="$4" mt="$2" textAlign="center" fontWeight="500">
          {error}
        </Text>
      )}

      <Button 
        onPress={onLoginPress} 
        size="$5" 
        mt="$4" 
        width="100%" 
        maxWidth={300} 
        disabled={loading}
        backgroundColor="$purple8"
        borderWidth={0}
        fontWeight="bold"
        fontSize="$5"
        hoverStyle={{
          backgroundColor: "$purple9",
          scale: 1.02
        }}
        pressStyle={{
          backgroundColor: "$purple7",
          scale: 0.98
        }}
        disabledStyle={{
          backgroundColor: "$purple4"
        }}
        icon={loading ? () => <Spinner size="small" color="$purple1" /> : undefined}
      >
        <Text color="$purple1" fontWeight="bold">{texts.loginButton}</Text>
      </Button>
    </YStack>
  );
};

export default LoginScreenPresentational; 