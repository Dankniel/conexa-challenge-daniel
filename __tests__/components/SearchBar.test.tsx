import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBarContainer from '../../src/components/SearchBar/SearchBarContainer';
import SearchBarPresentational from '../../src/components/SearchBar/SearchBarPresentational';

// Mock del hook usePosts
const mockUsePosts = jest.fn();
jest.mock('../../src/features/home/hooks/usePosts', () => ({
  usePosts: () => mockUsePosts(),
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
  Input: ({ onChangeText, value, ...props }: any) => {
    const React = require('react');
    return React.createElement('TextInput', { 
      testID: 'search-input', 
      onChangeText, 
      value, 
      ...props 
    });
  },
  Button: ({ children, onPress, icon, ...props }: any) => {
    const React = require('react');
    return React.createElement('TouchableOpacity', { 
      testID: 'clear-button', 
      onPress, 
      ...props 
    }, [
      icon && React.createElement('View', { testID: 'button-icon', key: 'icon' }, 
        React.createElement(icon, { testID: 'x-icon' })
      ),
      children
    ].filter(Boolean));
  },
}));

jest.mock('@tamagui/lucide-icons', () => ({
  Search: (props: any) => {
    const React = require('react');
    return React.createElement('Text', { testID: 'search-icon', ...props }, 'Search');
  },
  X: (props: any) => {
    const React = require('react');
    return React.createElement('Text', { testID: 'x-icon', ...props }, 'X');
  },
}));

describe('SearchBarContainer', () => {
  const mockHandleSearch = jest.fn();
  const mockHandleClearSearch = jest.fn();
  const mockT = jest.fn((key) => {
    if (key === 'home.searchPlaceholder') {
      return 'Buscar noticias...';
    }
    return key;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseI18n.mockReturnValue({
      t: mockT,
    });
    mockUsePosts.mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleClearSearch: mockHandleClearSearch,
    });
  });

  describe('Renderizado básico', () => {
    it('debe renderizar correctamente con placeholder por defecto', () => {
      const { getByTestId } = render(
        <SearchBarContainer />
      );

      const input = getByTestId('search-input');
      expect(input).toBeTruthy();
      expect(input.props.placeholder).toBe('Buscar noticias...');
    });

    it('debe renderizar con placeholder personalizado', () => {
      const customPlaceholder = 'Placeholder personalizado';
      const { getByTestId } = render(
        <SearchBarContainer placeholder={customPlaceholder} />
      );

      const input = getByTestId('search-input');
      expect(input.props.placeholder).toBe(customPlaceholder);
    });
  });

  describe('Estado de búsqueda', () => {
    it('debe mostrar el valor actual de búsqueda', () => {
      mockUsePosts.mockReturnValue({
        searchQuery: 'test query',
        handleSearch: mockHandleSearch,
        handleClearSearch: mockHandleClearSearch,
      });

      const { getByTestId } = render(
        <SearchBarContainer />
      );

      const input = getByTestId('search-input');
      expect(input.props.value).toBe('test query');
    });

    it('no debe mostrar botón de limpiar cuando searchQuery está vacío', () => {
      mockUsePosts.mockReturnValue({
        searchQuery: '',
        handleSearch: mockHandleSearch,
        handleClearSearch: mockHandleClearSearch,
      });

      const { queryByTestId } = render(
        <SearchBarContainer />
      );

      expect(queryByTestId('clear-button')).toBeNull();
    });

    it('debe mostrar botón de limpiar cuando hay texto de búsqueda', () => {
      mockUsePosts.mockReturnValue({
        searchQuery: 'test',
        handleSearch: mockHandleSearch,
        handleClearSearch: mockHandleClearSearch,
      });

      const { getByTestId } = render(
        <SearchBarContainer />
      );

      expect(getByTestId('clear-button')).toBeTruthy();
    });
  });

  describe('Interacciones de búsqueda', () => {
    it('debe llamar handleSearch cuando cambia el texto', () => {
      const { getByTestId } = render(
        <SearchBarContainer />
      );

      const input = getByTestId('search-input');
      fireEvent.changeText(input, 'nueva búsqueda');

      expect(mockHandleSearch).toHaveBeenCalledWith('nueva búsqueda');
    });

    it('debe llamar callback onSearch cuando se proporciona', () => {
      const mockOnSearch = jest.fn();
      const { getByTestId } = render(
        <SearchBarContainer onSearch={mockOnSearch} />
      );

      const input = getByTestId('search-input');
      fireEvent.changeText(input, 'test');

      expect(mockOnSearch).toHaveBeenCalledWith('test');
    });

    it('debe llamar handleClearSearch cuando se presiona limpiar', () => {
      mockUsePosts.mockReturnValue({
        searchQuery: 'test',
        handleSearch: mockHandleSearch,
        handleClearSearch: mockHandleClearSearch,
      });

      const { getByTestId } = render(
        <SearchBarContainer />
      );

      const clearButton = getByTestId('clear-button');
      fireEvent.press(clearButton);

      expect(mockHandleClearSearch).toHaveBeenCalledTimes(1);
    });

    it('debe llamar callback onClear cuando se proporciona', () => {
      const mockOnClear = jest.fn();
      mockUsePosts.mockReturnValue({
        searchQuery: 'test',
        handleSearch: mockHandleSearch,
        handleClearSearch: mockHandleClearSearch,
      });

      const { getByTestId } = render(
        <SearchBarContainer onClear={mockOnClear} />
      );

      const clearButton = getByTestId('clear-button');
      fireEvent.press(clearButton);

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
  });
});

describe('SearchBarPresentational', () => {
  const defaultProps = {
    value: '',
    onChangeText: jest.fn(),
    onClear: jest.fn(),
    placeholder: 'Buscar...',
    showClearButton: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    it('debe renderizar correctamente', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} />
      );

      expect(getByTestId('xstack')).toBeTruthy();
      expect(getByTestId('search-input')).toBeTruthy();
      expect(getByTestId('search-icon')).toBeTruthy();
    });

    it('debe mostrar el placeholder correcto', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} placeholder="Placeholder personalizado" />
      );

      const input = getByTestId('search-input');
      expect(input.props.placeholder).toBe('Placeholder personalizado');
    });

    it('debe mostrar el valor correcto', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} value="texto de búsqueda" />
      );

      const input = getByTestId('search-input');
      expect(input.props.value).toBe('texto de búsqueda');
    });
  });

  describe('Botón de limpiar', () => {
    it('no debe mostrar botón de limpiar cuando showClearButton es false', () => {
      const { queryByTestId } = render(
        <SearchBarPresentational {...defaultProps} showClearButton={false} />
      );

      expect(queryByTestId('clear-button')).toBeNull();
    });

    it('debe mostrar botón de limpiar cuando showClearButton es true', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} showClearButton={true} />
      );

      expect(getByTestId('clear-button')).toBeTruthy();
    });

    it('debe llamar onClear cuando se presiona el botón de limpiar', () => {
      const mockOnClear = jest.fn();
      const { getByTestId } = render(
        <SearchBarPresentational 
          {...defaultProps} 
          showClearButton={true} 
          onClear={mockOnClear} 
        />
      );

      const clearButton = getByTestId('clear-button');
      fireEvent.press(clearButton);

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estilos aplicados', () => {
    it('debe aplicar los estilos correctos al XStack', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} />
      );

      const xstack = getByTestId('xstack');
      expect(xstack.props.alignItems).toBe('center');
      expect(xstack.props.backgroundColor).toBe('$background');
      expect(xstack.props.borderRadius).toBe('$4');
      expect(xstack.props.borderWidth).toBe(1);
      expect(xstack.props.borderColor).toBe('$borderColor');
      expect(xstack.props.paddingHorizontal).toBe('$3');
      expect(xstack.props.paddingVertical).toBe('$2');
      expect(xstack.props.gap).toBe('$2');
    });

    it('debe aplicar los estilos correctos al Input', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} />
      );

      const input = getByTestId('search-input');
      expect(input.props.flex).toBe(1);
      expect(input.props.backgroundColor).toBe('transparent');
      expect(input.props.borderWidth).toBe(0);
      expect(input.props.fontSize).toBe('$4');
      expect(input.props.paddingHorizontal).toBe('$0');
      expect(input.props.placeholderTextColor).toBe('$gray10');
    });

    it('debe aplicar los estilos correctos al botón de limpiar', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} showClearButton={true} />
      );

      const clearButton = getByTestId('clear-button');
      expect(clearButton.props.size).toBe('$2');
      expect(clearButton.props.variant).toBe('outlined');
      expect(clearButton.props.circular).toBe(true);
      expect(clearButton.props.color).toBe('$gray10');
      expect(clearButton.props.borderWidth).toBe(0);
      expect(clearButton.props.backgroundColor).toBe('transparent');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onChangeText cuando cambia el texto', () => {
      const mockOnChangeText = jest.fn();
      const { getByTestId } = render(
        <SearchBarPresentational 
          {...defaultProps} 
          onChangeText={mockOnChangeText} 
        />
      );

      const input = getByTestId('search-input');
      fireEvent.changeText(input, 'nuevo texto');

      expect(mockOnChangeText).toHaveBeenCalledWith('nuevo texto');
    });
  });

  describe('Iconos', () => {
    it('debe renderizar el icono de búsqueda', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} />
      );

      const searchIcon = getByTestId('search-icon');
      expect(searchIcon).toBeTruthy();
      expect(searchIcon.props.size).toBe(20);
      expect(searchIcon.props.color).toBe('$gray10');
    });

    it('debe renderizar el icono X cuando se muestra el botón de limpiar', () => {
      const { getByTestId } = render(
        <SearchBarPresentational {...defaultProps} showClearButton={true} />
      );

      expect(getByTestId('x-icon')).toBeTruthy();
    });
  });
}); 