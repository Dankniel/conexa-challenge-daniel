import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { setUserToken, setLoading } from '../../../../store/slices/authSlice';
import LoginScreenPresentational from './LoginScreenPresentational';

const LoginScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    // Simulate login (API call, etc.)
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setUserToken('dummy-token'));
      dispatch(setLoading(false));
      console.log('User logged in (Redux)');
    }, 1000); // Simulate network delay
  };

  return (
    <LoginScreenPresentational
      text="Login Screen"
      onLoginPress={handleLogin}
    />
  );
};

export default LoginScreenContainer; 