import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeScreen from '../features/home/screens/HomeScreen/HomeScreenContainer';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator; 