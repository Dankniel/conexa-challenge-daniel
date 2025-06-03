import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import UsersScreen from '../features/users/screens/UsersScreen/UsersScreenContainer';
import SettingsScreen from '../features/settings/screens/SettingsScreen/SettingsScreenContainer';
import { Home, Users, Settings } from '@tamagui/lucide-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppInitialization } from '../features/home/hooks/usePosts';
import { useI18n } from '../i18n';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  
  // Inicializar la aplicación cargando favoritos de manera no bloqueante
  useAppInitialization();
  
  // Detecta si el dispositivo Android tiene botones de navegación
  const hasNavigationButtons = Platform.OS === 'android' && insets.bottom > 10;
  
  // Calcula el padding y altura apropiados
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') return 80;
    
    // Android con botones de navegación
    if (hasNavigationButtons) {
      return 70 + insets.bottom;
    }
    
    // Android sin botones (solo gestos)
    return 70;
  };
  
  const getTabBarPadding = () => {
    if (Platform.OS === 'ios') return insets.bottom + 10;
    
    // Android con botones de navegación - padding extra
    if (hasNavigationButtons) {
      return Math.max(insets.bottom + 20, 30);
    }
    
    // Android sin botones - padding normal
    return Math.max(insets.bottom, 8);
  };
  
  return (
    <View style={styles.container}>
      <MainTab.Navigator 
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#c4b5fd',
          tabBarStyle: [
            styles.tabBarStyle,
            {
              height: getTabBarHeight(),
              paddingBottom: getTabBarPadding(),
            }
          ],
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarBackground: () => (
            <View style={styles.tabBarBackground} />
          ),
        }}
      >
        <MainTab.Screen 
          name="Home" 
          component={HomeStackNavigator} 
          options={{ 
            title: t('navigation.home'),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
          }} 
        />
        <MainTab.Screen 
          name="Users" 
          component={UsersScreen} 
          options={{ 
            title: t('navigation.users'),
            tabBarIcon: ({ color, size }) => <Users size={size} color={color} />
          }} 
        />
        <MainTab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            title: t('navigation.settings'),
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
          }} 
        />
      </MainTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c3aed',
  },
  tabBarStyle: {
    backgroundColor: '#7c3aed',
    borderTopColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 15,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabBarBackground: {
    flex: 1, 
    backgroundColor: '#7c3aed',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default MainTabNavigator; 