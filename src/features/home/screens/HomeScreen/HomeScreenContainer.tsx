import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { setUserToken, setLoading } from '../../../../store/slices/authSlice';
import HomeScreenPresentational from './HomeScreenPresentational';

const HomeScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

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
    <HomeScreenPresentational
      text="Home Screen"
      onLogoutPress={handleLogout}
    />
  );
};

export default HomeScreenContainer; 