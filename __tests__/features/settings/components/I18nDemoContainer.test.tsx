import React from 'react';
import { render } from '@testing-library/react-native';

// Mock simple de i18n - debe estar al principio
jest.mock('../../../../src/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
  useLanguageWithRedux: () => ({
    selectedLanguage: 'en',
  }),
}));

// Mock del componente presentacional
jest.mock('../../../../src/features/settings/components/I18nDemo/I18nDemoPresentational', () => ({
  I18nDemoPresentational: ({ title, description }: any) => {
    const React = require('react');
    return React.createElement('View', { testID: 'i18n-demo-presentational' }, [
      React.createElement('Text', { key: 'title' }, title),
      React.createElement('Text', { key: 'description' }, description),
    ]);
  },
}));

import { I18nDemoContainer } from '../../../../src/features/settings/components/I18nDemo/I18nDemoContainer';

describe('I18nDemoContainer', () => {
  it('debería renderizar el componente sin errores', () => {
    const { getByTestId } = render(<I18nDemoContainer />);
    expect(getByTestId('i18n-demo-presentational')).toBeTruthy();
  });

  it('debería pasar props básicas al componente presentacional', () => {
    const { getByText } = render(<I18nDemoContainer />);
    // Verificar que las claves de traducción se pasen como texto
    expect(getByText('settings.language')).toBeTruthy();
    expect(getByText('settings.languageDescription')).toBeTruthy();
  });
}); 