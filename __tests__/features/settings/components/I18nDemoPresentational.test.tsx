import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { I18nDemoPresentational } from '../../../../src/features/settings/components/I18nDemo/I18nDemoPresentational';

// Mockear LanguageSwitcherContainer y sus subcomponentes de manera simple
jest.mock('../../../../src/features/settings/components/LanguageSwitcher/LanguageSwitcherContainer', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  const MockLanguageSwitcher = ({ children }: { children: any }) => 
    React.createElement(View, { testID: 'language-switcher' }, children);
  
  MockLanguageSwitcher.Button = ({ children, language }: { children: any, language: string }) => 
    React.createElement(Text, { testID: `language-button-${language}` }, children);

  MockLanguageSwitcher.Toggle = ({ children }: { children: any }) => 
    React.createElement(Text, { testID: 'language-toggle' }, children);

  MockLanguageSwitcher.Text = ({ translationKey }: { translationKey: string }) => 
    React.createElement(Text, { testID: `language-text-${translationKey}` }, translationKey);

  return {
    LanguageSwitcherContainer: MockLanguageSwitcher,
  };
});

// Mock de Tamagui components
jest.mock('tamagui', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  return {
    YStack: ({ children, ...props }: any) => React.createElement(View, { testID: 'y-stack', ...props }, children),
    XStack: ({ children, ...props }: any) => React.createElement(View, { testID: 'x-stack', ...props }, children),
    Text: ({ children, ...props }: any) => React.createElement(Text, { testID: 'tamagui-text', ...props }, children),
    Card: ({ children, ...props }: any) => React.createElement(View, { testID: 'card', ...props }, children),
  };
});

// Mock de lucide icons
jest.mock('@tamagui/lucide-icons', () => ({
  Globe: ({ size, color }: any) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { testID: 'globe-icon' }, '🌍');
  },
}));

const defaultProps = {
  title: 'Título de Prueba',
  description: 'Descripción de prueba para el componente.',
  savedLanguageLabel: 'Idioma Guardado',
  selectedLanguageDisplay: '🇫🇷 Français',
  demoTitle: 'Demo de Textos',
  demoTexts: [
    { label: 'EtiquetaComun', value: 'ValorComun' },
    { label: 'EtiquetaNav', value: 'ValorNav' },
  ],
};

describe('I18nDemoPresentational', () => {
  it('debería renderizar todos los textos y etiquetas correctamente', () => {
    const { getByText } = render(<I18nDemoPresentational {...defaultProps} />);

    expect(getByText(defaultProps.title)).toBeTruthy();
    expect(getByText(defaultProps.description)).toBeTruthy();
    expect(getByText(`${defaultProps.savedLanguageLabel}:`)).toBeTruthy();
    expect(getByText(defaultProps.selectedLanguageDisplay)).toBeTruthy();
    expect(getByText(defaultProps.demoTitle)).toBeTruthy();
  });

  it('debería renderizar la lista de demoTexts', () => {
    const { getByText } = render(<I18nDemoPresentational {...defaultProps} />);

    defaultProps.demoTexts.forEach(item => {
      expect(getByText(`${item.label}:`)).toBeTruthy();
      expect(getByText(item.value)).toBeTruthy();
    });
  });

  it('debería renderizar los botones de LanguageSwitcher como hijos', () => {
    const { getByTestId, getByText } = render(<I18nDemoPresentational {...defaultProps} />);
    expect(getByTestId('language-switcher')).toBeTruthy();
    expect(getByTestId('language-button-es')).toBeTruthy();
    expect(getByTestId('language-button-en')).toBeTruthy();
    
    // Verificar que los textos de los botones estén presentes
    expect(getByText('🇪🇸 Español')).toBeTruthy();
    expect(getByText('🇺🇸 English')).toBeTruthy();
  });
}); 