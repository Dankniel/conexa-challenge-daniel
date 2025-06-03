import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeScreen from '../features/home/screens/HomeScreen/HomeScreenContainer';
import UsersScreen from '../features/users/screens/UsersScreen/UsersScreenContainer';
import SettingsScreen from '../features/settings/screens/SettingsScreen/SettingsScreenContainer';
import { Home, Users, Settings } from '@tamagui/lucide-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <MainTab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#c4b5fd',
        tabBarStyle: {
          backgroundColor: '#7c3aed',
          borderTopColor: '#8b5cf6',
          borderTopWidth: 1,
          height: Platform.OS === 'android' ? 60 + insets.bottom : 80,
          paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom, 5) : insets.bottom + 10,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }} 
      />
      <MainTab.Screen 
        name="Users" 
        component={UsersScreen} 
        options={{ 
          title: 'Usuarios',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />
        }} 
      />
      <MainTab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Configuración',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
        }} 
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator; 