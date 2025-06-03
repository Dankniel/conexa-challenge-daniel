import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { setUserToken } from '../../../../store/slices/authSlice';
import { useI18n } from '../../../../i18n';
import LoginScreenPresentational from './LoginScreenPresentational';

const LoginScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError(null);

    if (!username || !password) {
      setError(t('login.errorRequired'));
      return;
    }

    console.log('Attempting login with:', { username, password });
    setLoading(true);

    setTimeout(() => {
      if (username === 'test' && password === 'password') {
        dispatch(setUserToken('dummy-token'));
        console.log('User logged in (Redux)');
      } else {
        setError(t('login.errorInvalidCredentials'));
        console.log('Login failed: Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginScreenPresentational
      text={t('login.welcome')}
      onLoginPress={handleLogin}
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      loading={loading}
      error={error}
      showPassword={showPassword}
      onTogglePasswordVisibility={togglePasswordVisibility}
    />
  );
};

export default LoginScreenContainer; 