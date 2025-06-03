import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { setUserToken, setLoading } from '../../../../store/slices/authSlice';
import SettingsScreenPresentational from './SettingsScreenPresentational';

const SettingsScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const handleLogout = () => {
    // Simulate logout (API call, clear data, etc.)
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setUserToken(null));
      dispatch(setLoading(false));
      console.log('User logged out (Redux)');
    }, 1000); // Simulate network delay
  };

  // Calcular padding top para evitar superposición
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const paddingTop = insets.top + statusBarHeight + 20;

  return (
    <SettingsScreenPresentational
      onLogoutPress={handleLogout}
      loading={isLoading}
      paddingTop={paddingTop}
    />
  );
};

export default SettingsScreenContainer; 