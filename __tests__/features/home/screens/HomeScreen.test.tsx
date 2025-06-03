import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../../../src/features/home/screens/HomeScreen/HomeScreenContainer';
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

describe('HomeScreen', () => {
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
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('Home Screen')).toBeTruthy();
    expect(getByText('Simulate Logout (Redux)')).toBeTruthy();
  });

  it('calls handleLogout when the button is pressed', () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('Simulate Logout (Redux)'));

    // Verificar que se llama setLoading(true) inmediatamente
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));

    // Avanzar el timer para ejecutar el setTimeout
    jest.advanceTimersByTime(1000);

    // Verificar que se llaman las acciones después del timeout
    expect(mockDispatch).toHaveBeenCalledWith(setUserToken(null));
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    
    // Verificar el número total de llamadas
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
}); 