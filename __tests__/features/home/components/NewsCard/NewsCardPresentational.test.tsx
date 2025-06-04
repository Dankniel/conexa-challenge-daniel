import React from 'react';
import { render } from '@testing-library/react-native';
import NewsCardPresentational from '../../../../../src/features/home/components/NewsCard/NewsCardPresentational';
import { NewsData } from '../../../../../src/features/home/components/NewsCard/types';

// Mock básico de Tamagui
jest.mock('tamagui', () => {
  const React = require('react');
  const mockComponent = (name: string) => ({ children, ...props }: any) => 
    React.createElement(name, props, children);
  
  return {
    YStack: mockComponent('View'),
    XStack: mockComponent('View'),
    Text: mockComponent('Text'),
    Image: mockComponent('Image'),
    Card: mockComponent('View'),
    Button: mockComponent('TouchableOpacity'),
  };
});

// Mock básico de iconos
jest.mock('@tamagui/lucide-icons', () => ({
  Heart: ({ testID, ...props }: any) => {
    const React = require('react');
    return React.createElement('Text', { testID: testID || 'heart-icon', ...props }, '♥');
  },
}));

const mockNewsData: NewsData = {
  id: '1',
  title: 'Título de prueba',
  description: 'Esta es una descripción de prueba para la noticia',
  imageUrl: 'https://example.com/image.jpg',
  publishedAt: '01/01/2024 10:30:00',
  source: 'Test Source',
  category: 'Tecnología'
};

describe('NewsCardPresentational', () => {
  const defaultProps = {
    news: mockNewsData,
    formattedDate: '01 ene 2024',
    onPress: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar sin errores', () => {
    expect(() => {
      render(<NewsCardPresentational {...defaultProps} />);
    }).not.toThrow();
  });

  it('debe renderizar el título de la noticia', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    expect(getByText('Título de prueba')).toBeTruthy();
  });

  it('debe renderizar la descripción de la noticia', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    expect(getByText('Esta es una descripción de prueba para la noticia')).toBeTruthy();
  });

  it('debe renderizar la fuente de la noticia', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    expect(getByText('Test Source')).toBeTruthy();
  });

  it('debe renderizar la categoría de la noticia', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    expect(getByText('Tecnología')).toBeTruthy();
  });

  it('debe renderizar la fecha formateada', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    expect(getByText('01 ene 2024')).toBeTruthy();
  });

  it('debe mostrar el botón de favorito cuando onToggleFavorite está presente', () => {
    const propsWithFavorite = {
      ...defaultProps,
      onToggleFavorite: jest.fn(),
      isFavorite: false
    };
    
    const { getByTestId } = render(<NewsCardPresentational {...propsWithFavorite} />);
    expect(getByTestId('heart-icon')).toBeTruthy();
  });

  it('no debe mostrar el botón de favorito cuando onToggleFavorite no está presente', () => {
    const { queryByTestId } = render(<NewsCardPresentational {...defaultProps} />);
    expect(queryByTestId('heart-icon')).toBeNull();
  });

  it('debe manejar el estado de favorito true', () => {
    const propsWithFavorite = {
      ...defaultProps,
      onToggleFavorite: jest.fn(),
      isFavorite: true
    };
    
    expect(() => {
      render(<NewsCardPresentational {...propsWithFavorite} />);
    }).not.toThrow();
  });

  it('debe manejar el estado de favorito false', () => {
    const propsWithFavorite = {
      ...defaultProps,
      onToggleFavorite: jest.fn(),
      isFavorite: false
    };
    
    expect(() => {
      render(<NewsCardPresentational {...propsWithFavorite} />);
    }).not.toThrow();
  });

  it('debe validar que los props requeridos están presentes', () => {
    const { getByText } = render(<NewsCardPresentational {...defaultProps} />);
    
    // Verificar que todos los campos requeridos se renderizan
    expect(getByText(mockNewsData.title)).toBeTruthy();
    expect(getByText(mockNewsData.description)).toBeTruthy();
    expect(getByText(mockNewsData.source)).toBeTruthy();
    expect(getByText(mockNewsData.category)).toBeTruthy();
    expect(getByText(defaultProps.formattedDate)).toBeTruthy();
  });
}); 