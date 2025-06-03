import React from 'react';
import { View, Text, Button } from 'react-native';
import { LoginScreenPresentationalProps } from './types';
import { styles } from './styles';

const LoginScreenPresentational = ({ text, onLoginPress }: LoginScreenPresentationalProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button title="Simulate Login (Redux)" onPress={onLoginPress} />
    </View>
  );
};

export default LoginScreenPresentational; 