import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { setUserToken } from '../../../../store/slices/authSlice';
import LoginScreenPresentational from './LoginScreenPresentational';

const LoginScreenContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError(null);

    if (!username || !password) {
      setError('Por favor, ingresa usuario y contraseña.');
      return;
    }

    console.log('Attempting login with:', { username, password });
    setLoading(true);

    setTimeout(() => {
      if (username === 'test' && password === 'password') {
        dispatch(setUserToken('dummy-token'));
        console.log('User logged in (Redux)');
      } else {
        setError('Credenciales inválidas.');
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
      text="Bienvenido de nuevo!"
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