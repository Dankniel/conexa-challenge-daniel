import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../../../src/features/auth/screens/LoginScreen/LoginScreenContainer';
import { setUserToken, setLoading } from '../../../../src/store/slices/authSlice';

// Mock de react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock del NavigationContainer
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

import { useDispatch } from 'react-redux';

// Cast del mock para TypeScript
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe('LoginScreen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockDispatch.mockClear();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    
    expect(getByText('Login Screen')).toBeTruthy();
    expect(getByText('Simulate Login (Redux)')).toBeTruthy();
  });

  it('calls handleLogin when the button is pressed', () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Simulate Login (Redux)'));

    // Verificar que se llama setLoading(true) inmediatamente
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));

    // Avanzar el timer para ejecutar el setTimeout
    jest.advanceTimersByTime(1000);

    // Verificar que se llaman las acciones después del timeout
    expect(mockDispatch).toHaveBeenCalledWith(setUserToken('dummy-token'));
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    
    // Verificar el número total de llamadas
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
}); 