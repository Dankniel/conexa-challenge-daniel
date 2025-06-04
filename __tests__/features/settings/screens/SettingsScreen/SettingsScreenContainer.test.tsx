import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Platform, StatusBar } from 'react-native';

// Mock simple de react-redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(() => false), // isLoading = false por defecto
}));

// Mock simple de react-native-safe-area-context
const mockInsets = { top: 20, bottom: 30, left: 0, right: 0 };
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => mockInsets,
}));

// Mock simple de i18n
jest.mock('../../../../../src/i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

// Mock simple de authSlice
jest.mock('../../../../../src/store/slices/authSlice', () => ({
  setUserToken: jest.fn((value) => ({ type: 'setUserToken', payload: value })),
  setLoading: jest.fn((value) => ({ type: 'setLoading', payload: value })),
}));

// Mock del componente presentacional
jest.mock('../../../../../src/features/settings/screens/SettingsScreen/SettingsScreenPresentational', () => {
  return ({ onLogoutPress, loading, paddingTop, texts }: any) => {
    const React = require('react');
    return React.createElement('View', 
      { 
        testID: 'settings-screen-presentational',
        'data-logout': onLogoutPress,
        'data-loading': loading,
        'data-padding': paddingTop,
        'data-title': texts?.title,
        'data-button': texts?.logoutButton
      }
    );
  };
});

import SettingsScreenContainer from '../../../../../src/features/settings/screens/SettingsScreen/SettingsScreenContainer';

// Usar timers reales para evitar problemas
jest.useRealTimers();

describe('SettingsScreenContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'android';
    StatusBar.currentHeight = 24;
  });

  it('debería renderizar el componente presentacional', () => {
    const { getByTestId } = render(<SettingsScreenContainer />);
    expect(getByTestId('settings-screen-presentational')).toBeTruthy();
  });

  it('debería calcular paddingTop correctamente', () => {
    const { getByTestId } = render(<SettingsScreenContainer />);
    const component = getByTestId('settings-screen-presentational');
    
    const expectedPaddingTop = mockInsets.top + (Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0) + 20;
    expect(component.props['data-padding']).toBe(expectedPaddingTop);
  });

  it('debería pasar los textos correctos', () => {
    const { getByTestId } = render(<SettingsScreenContainer />);
    const component = getByTestId('settings-screen-presentational');
    
    expect(component.props['data-title']).toBe('settings.title');
    expect(component.props['data-button']).toBe('auth.logout');
  });

  it('debería calcular paddingTop correctamente para iOS', () => {
    Platform.OS = 'ios';
    StatusBar.currentHeight = undefined;
    
    const { getByTestId } = render(<SettingsScreenContainer />);
    const component = getByTestId('settings-screen-presentational');
    
    const expectedPaddingTopIOS = mockInsets.top + 0 + 20;
    expect(component.props['data-padding']).toBe(expectedPaddingTopIOS);
  });
}); 