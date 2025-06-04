import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';

// Mock simple de los hooks de i18n
const mockChangeLanguage = jest.fn();
const mockToggleLanguage = jest.fn();
const mockTFunction = jest.fn((key: string) => key);

jest.mock('../../../../../src/i18n', () => ({
  useLanguageWithRedux: () => ({
    selectedLanguage: 'en',
    currentLanguage: 'en',
    changeLanguage: mockChangeLanguage,
    toggleLanguage: mockToggleLanguage,
  }),
  useI18n: () => ({
    t: mockTFunction,
  }),
}));

// Mock simple de componentes presentacionales
jest.mock('../../../../../src/features/settings/components/LanguageSwitcher/LanguageSwitcherPresentational', () => {
  const React = require('react');
  
  return {
    LanguageSwitcherPresentational: ({ children }: { children: React.ReactNode }) => 
      React.createElement('View', { testID: 'switcher-presentational' }, children),
    
    LanguageButtonPresentational: ({ children, onPress }: { children?: React.ReactNode, onPress?: () => void }) => 
      React.createElement('TouchableOpacity', 
        { onPress, testID: 'lang-button-presentational' },
        typeof children === 'string' ? React.createElement('Text', {}, children) : children
      ),
    
    LanguageTogglePresentational: ({ children, onPress }: { children?: React.ReactNode, onPress?: () => void }) => 
      React.createElement('TouchableOpacity', 
        { onPress, testID: 'lang-toggle-presentational' },
        typeof children === 'string' ? React.createElement('Text', {}, children) : children
      ),
    
    LanguageTextPresentational: ({ text }: { text: string }) => 
      React.createElement('Text', { testID: 'lang-text-presentational' }, text),
  };
});

import { LanguageSwitcherContainer } from '../../../../../src/features/settings/components/LanguageSwitcher/LanguageSwitcherContainer';

describe('LanguageSwitcherContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LanguageSwitcherContainer (Main)', () => {
    it('debería renderizar sus hijos a través de LanguageSwitcherPresentational', () => {
      const { getByTestId } = render(
        <LanguageSwitcherContainer>
          <View testID="child-element" />
        </LanguageSwitcherContainer>
      );
      expect(getByTestId('switcher-presentational')).toBeTruthy();
      expect(getByTestId('child-element')).toBeTruthy();
    });
  });

  describe('LanguageSwitcherContainer.Button', () => {
    it('debería llamar a changeLanguage al presionar si onPress no se provee', () => {
      const { getByTestId } = render(<LanguageSwitcherContainer.Button language="es">Español</LanguageSwitcherContainer.Button>);
      fireEvent.press(getByTestId('lang-button-presentational'));
      expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('debería llamar a la prop onPress al presionar si se provee', () => {
      const mockOnPress = jest.fn();
      const { getByTestId } = render(
        <LanguageSwitcherContainer.Button language="es" onPress={mockOnPress}>
          Español
        </LanguageSwitcherContainer.Button>
      );
      fireEvent.press(getByTestId('lang-button-presentational'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockChangeLanguage).not.toHaveBeenCalled();
    });
  });

  describe('LanguageSwitcherContainer.Toggle', () => {
    it('debería llamar a toggleLanguage al presionar', () => {
      const { getByTestId } = render(<LanguageSwitcherContainer.Toggle>Toggle</LanguageSwitcherContainer.Toggle>);
      fireEvent.press(getByTestId('lang-toggle-presentational'));
      expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
    });
  });

  describe('LanguageSwitcherContainer.Text', () => {
    it('debería llamar a t con la translationKey y pasar el texto traducido', () => {
      const testKey = 'test.key';
      mockTFunction.mockReturnValueOnce('Texto Traducido');
      const { getByTestId } = render(<LanguageSwitcherContainer.Text translationKey={testKey} />);
      
      expect(mockTFunction).toHaveBeenCalledWith(testKey);
      expect(getByTestId('lang-text-presentational')).toBeTruthy();
      expect(getByTestId('lang-text-presentational').props.children).toBe('Texto Traducido');
    });
  });
}); 