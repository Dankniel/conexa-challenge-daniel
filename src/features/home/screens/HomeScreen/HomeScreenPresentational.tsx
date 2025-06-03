import React from 'react';
import { View, Text, Button } from 'react-native';
import { HomeScreenPresentationalProps } from './types';
import { styles } from './styles';

const HomeScreenPresentational = ({ text, onLogoutPress }: HomeScreenPresentationalProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button title="Simulate Logout (Redux)" onPress={onLogoutPress} />
    </View>
  );
};

export default HomeScreenPresentational; 