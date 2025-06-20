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

    if (!username.trim() || !password.trim()) {
      setError(t('login.errorRequired'));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username.trim() === 'test' && password.trim() === 'password') {
        dispatch(setUserToken('dummy-token'));
      } else {
        setError(t('login.errorInvalidCredentials'));
      }
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Preparar textos traducidos
  const texts = {
    username: t('login.username'),
    usernamePlaceholder: t('login.usernamePlaceholder'),
    password: t('login.password'),
    passwordPlaceholder: t('login.passwordPlaceholder'),
    loginButton: t('login.loginButton')
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
      texts={texts}
    />
  );
};

export default LoginScreenContainer; 