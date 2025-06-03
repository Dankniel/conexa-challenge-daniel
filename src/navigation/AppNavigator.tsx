import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setLoading, setUserToken } from '../store/slices/authSlice';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // Get authentication state from the Redux store
  const { userToken, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // Simulate initial loading and token check
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // For now, we simulate that there's no saved token
      dispatch(setLoading(false));
      // To test the logged-in flow on startup, uncomment the next line:
   // dispatch(setUserToken('dummy-token'));
    }, 1000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]); // Add dispatch to dependencies


  if (isLoading) {
    // Initial loading screen
    return null; // Or a loading component (Splash Screen)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 