import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../../../src/features/auth/screens/LoginScreen/LoginScreenContainer';
import { setUserToken } from '../../../../src/store/slices/authSlice';

// Mock de react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock de Tamagui components con funciones simples
jest.mock('tamagui', () => ({
  YStack: 'YStack',
  XStack: 'XStack', 
  Text: 'Text',
  Button: 'Button',
  Input: 'Input',
  Label: 'Label',
  Spinner: 'Spinner',
}));

// Mock de @tamagui/lucide-icons
jest.mock('@tamagui/lucide-icons', () => ({
  Eye: 'Eye',
  EyeOff: 'EyeOff',
}));

import { useDispatch } from 'react-redux';

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

  it('renders without crashing', () => {
    const component = render(<LoginScreen />);
    expect(component).toBeTruthy();
  });

  it('uses correct redux dispatch', () => {
    render(<LoginScreen />);
    // Verificar que useDispatch fue llamado
    expect(mockUseDispatch).toHaveBeenCalled();
  });

  it('does not dispatch on initial render', () => {
    render(<LoginScreen />);
    // No debería hacer dispatch en el render inicial
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('has timer functionality for simulated login', () => {
    render(<LoginScreen />);
    
    // Avanzar los timers para verificar que no hay crashes
    jest.advanceTimersByTime(1000);
    
    // El componente debería seguir funcionando después del timer
    expect(mockUseDispatch).toHaveBeenCalled();
  });
}); 