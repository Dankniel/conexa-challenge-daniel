import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoritesCounterContainer from '../../src/components/FavoritesCounter/FavoritesCounterContainer';
import FavoritesCounterPresentational from '../../src/components/FavoritesCounter/FavoritesCounterPresentational';

// Mock del hook useFavoritesCount
const mockUseFavoritesCount = jest.fn();
jest.mock('../../src/features/home/hooks/usePosts', () => ({
  useFavoritesCount: () => mockUseFavoritesCount(),
}));

// Mock del hook useI18n
const mockUseI18n = jest.fn();
jest.mock('../../src/i18n', () => ({
  useI18n: () => mockUseI18n(),
}));

// Mock de tamagui e iconos
jest.mock('tamagui', () => ({
  XStack: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('View', { testID: 'xstack', ...props }, children);
  },
  Text: ({ children, ...props }: any) => {
    const React = require('react');
    return React.createElement('Text', { testID: 'text', ...props }, children);
  },
  Button: ({ children, onPress, ...props }: any) => {
    const React = require('react');
    return React.createElement('TouchableOpacity', { testID: 'button', onPress, ...props }, children);
  },
}));

jest.mock('@tamagui/lucide-icons', () => ({
  Heart: (props: any) => {
    const React = require('react');
    return React.createElement('Text', { testID: 'heart-icon', ...props }, 'Heart');
  },
}));

describe('FavoritesCounterContainer', () => {
  const defaultMockT = jest.fn((key, options) => {
    if (key === 'favorites.favoritesCount') {
      return `Favorites: ${options?.count || 0}`;
    }
    return key;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseI18n.mockReturnValue({
      t: defaultMockT,
    });
  });

  describe('Renderizado condicional', () => {
    it('debe renderizar cuando hay favoritos', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 5,
      });

      const { getByTestId, getByText } = render(
        <FavoritesCounterContainer />
      );

      expect(getByTestId('button')).toBeTruthy();
      expect(getByText('Favorites: 5')).toBeTruthy();
    });

    it('no debe renderizar cuando no hay favoritos y showZero es false', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 0,
      });

      const { queryByTestId } = render(
        <FavoritesCounterContainer showZero={false} />
      );

      expect(queryByTestId('button')).toBeNull();
    });

    it('debe renderizar cuando no hay favoritos pero showZero es true', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 0,
      });

      const { getByTestId, getByText } = render(
        <FavoritesCounterContainer showZero={true} />
      );

      expect(getByTestId('button')).toBeTruthy();
      expect(getByText('Favorites: 0')).toBeTruthy();
    });
  });

  describe('Formateo de texto', () => {
    it('debe formatear correctamente el texto del contador', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 3,
      });

      const { getByText } = render(
        <FavoritesCounterContainer />
      );

      expect(defaultMockT).toHaveBeenCalledWith('favorites.favoritesCount', { count: 3 });
      expect(getByText('Favorites: 3')).toBeTruthy();
    });

    it('debe manejar contadores con números grandes', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 99,
      });

      const { getByText } = render(
        <FavoritesCounterContainer />
      );

      expect(getByText('Favorites: 99')).toBeTruthy();
    });
  });

  describe('Interacción del usuario', () => {
    it('debe llamar onPress cuando se presiona', () => {
      const mockOnPress = jest.fn();
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 1,
      });

      const { getByTestId } = render(
        <FavoritesCounterContainer onPress={mockOnPress} />
      );

      fireEvent.press(getByTestId('button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('no debe fallar si onPress no está definido', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 1,
      });

      const { getByTestId } = render(
        <FavoritesCounterContainer />
      );

      expect(() => {
        fireEvent.press(getByTestId('button'));
      }).not.toThrow();
    });
  });

  describe('Props por defecto', () => {
    it('debe tener showZero como false por defecto', () => {
      mockUseFavoritesCount.mockReturnValue({
        favoritesCount: 0,
      });

      const { queryByTestId } = render(
        <FavoritesCounterContainer />
      );

      expect(queryByTestId('button')).toBeNull();
    });
  });
});

describe('FavoritesCounterPresentational', () => {
  const defaultProps = {
    countText: 'Favorites: 5',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    it('debe renderizar correctamente', () => {
      const { getByTestId, getByText } = render(
        <FavoritesCounterPresentational {...defaultProps} />
      );

      expect(getByTestId('button')).toBeTruthy();
      expect(getByTestId('xstack')).toBeTruthy();
      expect(getByTestId('heart-icon')).toBeTruthy();
      expect(getByText('Favorites: 5')).toBeTruthy();
    });

    it('debe mostrar el texto del contador correctamente', () => {
      const { getByText } = render(
        <FavoritesCounterPresentational 
          countText="Custom count text" 
          onPress={jest.fn()} 
        />
      );

      expect(getByText('Custom count text')).toBeTruthy();
    });
  });

  describe('Estilos aplicados', () => {
    it('debe aplicar los estilos correctos al botón', () => {
      const { getByTestId } = render(
        <FavoritesCounterPresentational {...defaultProps} />
      );

      const button = getByTestId('button');
      expect(button.props.size).toBe('$3');
      expect(button.props.variant).toBe('outlined');
      expect(button.props.borderColor).toBe('$red9');
      expect(button.props.backgroundColor).toBe('$red2');
    });

    it('debe aplicar los estilos correctos al texto', () => {
      const { getByTestId } = render(
        <FavoritesCounterPresentational {...defaultProps} />
      );

      const text = getByTestId('text');
      expect(text.props.fontSize).toBe('$3');
      expect(text.props.color).toBe('$red11');
      expect(text.props.fontWeight).toBe('600');
    });

    it('debe aplicar los estilos correctos al XStack', () => {
      const { getByTestId } = render(
        <FavoritesCounterPresentational {...defaultProps} />
      );

      const xstack = getByTestId('xstack');
      expect(xstack.props.alignItems).toBe('center');
      expect(xstack.props.gap).toBe('$2');
    });
  });

  describe('Interacción', () => {
    it('debe llamar onPress cuando se presiona', () => {
      const mockOnPress = jest.fn();
      const { getByTestId } = render(
        <FavoritesCounterPresentational 
          {...defaultProps} 
          onPress={mockOnPress} 
        />
      );

      fireEvent.press(getByTestId('button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('no debe fallar si onPress no está definido', () => {
      const { getByTestId } = render(
        <FavoritesCounterPresentational 
          countText="Test" 
        />
      );

      expect(() => {
        fireEvent.press(getByTestId('button'));
      }).not.toThrow();
    });
  });

  describe('Iconos', () => {
    it('debe renderizar el icono de corazón', () => {
      const { getByTestId } = render(
        <FavoritesCounterPresentational {...defaultProps} />
      );

      const heartIcon = getByTestId('heart-icon');
      expect(heartIcon).toBeTruthy();
      expect(heartIcon.props.size).toBe(16);
      expect(heartIcon.props.color).toBe('$red10');
      expect(heartIcon.props.fill).toBe('$red10');
    });
  });
}); 