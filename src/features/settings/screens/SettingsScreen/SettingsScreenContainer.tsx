import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { setUserToken, setLoading } from '../../../../store/slices/authSlice';
import SettingsScreenPresentational from './SettingsScreenPresentational';

const SettingsScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <SettingsScreenPresentational
      text="Configuración"
      onLogoutPress={handleLogout}
      loading={isLoading}
    />
  );
};

export default SettingsScreenContainer; 