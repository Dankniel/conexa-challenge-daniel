import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Platform } from 'react-native';
import { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setLoading, setUserToken, loadLanguageFromStorage } from '../store/slices/authSlice';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // Get authentication state from the Redux store
  const { userToken, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // Simulate initial loading and token check
  useEffect(() => {
    const initializeApp = async () => {
      // Cargar idioma desde AsyncStorage
      await dispatch(loadLanguageFromStorage());
      
      const timeoutId = setTimeout(() => {
        // For now, we simulate that there's no saved token
        dispatch(setLoading(false));
        // To test the logged-in flow on startup, uncomment the next line:
        dispatch(setUserToken('dummy-token'));
      }, 1000);

      // Cleanup function to clear the timeout
      return () => {
        clearTimeout(timeoutId);
      };
    };

    initializeApp();
  }, [dispatch]);

  // Set navigation bar color for Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Configure navigation bar
      StatusBar.setBackgroundColor('#7c3aed', true);
      StatusBar.setBarStyle('light-content', true);
    }
  }, []);

  if (isLoading) {
    // Initial loading screen
    return null; // Or a loading component (Splash Screen)
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#7c3aed' }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#7c3aed" 
        translucent={Platform.OS === 'android'}
      />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: '#7c3aed',
            background: '#7c3aed',
            card: '#7c3aed',
            text: '#ffffff',
            border: '#8b5cf6',
            notification: '#c4b5fd',
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '700',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '900',
            },
          },
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken == null ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator; 