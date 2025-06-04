import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonContainer } from '../../src/components/Button/ButtonContainer';
import { ButtonPresentational } from '../../src/components/Button/ButtonPresentational';

// Mock de tamagui
jest.mock('tamagui', () => ({
  Button: ({ children, onPress, disabled, icon, ...props }: any) => {
    const React = require('react');
    return React.createElement(
      'TouchableOpacity',
      {
        testID: 'button',
        onPress: disabled ? undefined : onPress,
        disabled,
        ...props,
      },
      [
        icon && React.createElement('View', { testID: 'button-icon', key: 'icon' }, 
          typeof icon === 'function' ? icon() : icon
        ),
        React.createElement('Text', { key: 'text' }, children)
      ].filter(Boolean)
    );
  },
  Spinner: (props: any) => {
    const React = require('react');
    return React.createElement('ActivityIndicator', { testID: 'spinner', ...props });
  },
}));

describe('ButtonContainer', () => {
  const defaultProps = {
    children: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado básico', () => {
    it('debe renderizar correctamente con props por defecto', () => {
      const { getByText, getByTestId } = render(
        <ButtonContainer {...defaultProps} />
      );

      expect(getByText('Test Button')).toBeTruthy();
      expect(getByTestId('button')).toBeTruthy();
    });

    it('debe renderizar con children personalizado', () => {
      const { getByText } = render(
        <ButtonContainer {...defaultProps}>
          Custom Content
        </ButtonContainer>
      );

      expect(getByText('Custom Content')).toBeTruthy();
    });
  });

  describe('Estados del botón', () => {
    it('debe llamar onPress cuando se presiona', () => {
      const mockOnPress = jest.fn();
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} onPress={mockOnPress} />
      );

      fireEvent.press(getByTestId('button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('no debe llamar onPress cuando está disabled', () => {
      const mockOnPress = jest.fn();
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} onPress={mockOnPress} disabled={true} />
      );

      fireEvent.press(getByTestId('button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('debe mostrar spinner cuando loading es true', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} loading={true} />
      );

      expect(getByTestId('spinner')).toBeTruthy();
    });

    it('no debe llamar onPress cuando está en loading', () => {
      const mockOnPress = jest.fn();
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} onPress={mockOnPress} loading={true} />
      );

      fireEvent.press(getByTestId('button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Variantes de estilo', () => {
    it('debe aplicar estilos de variante primary por defecto', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} />
      );

      const button = getByTestId('button');
      expect(button.props.backgroundColor).toBe('$purple8');
      expect(button.props.borderColor).toBe('$purple9');
    });

    it('debe aplicar estilos de variante secondary', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} variant="secondary" />
      );

      const button = getByTestId('button');
      expect(button.props.backgroundColor).toBe('$purple3');
      expect(button.props.borderColor).toBe('$purple5');
    });

    it('debe aplicar estilos de variante ghost', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} variant="ghost" />
      );

      const button = getByTestId('button');
      expect(button.props.backgroundColor).toBe('transparent');
      expect(button.props.borderColor).toBe('$purple5');
    });

    it('debe aplicar estilos de variante danger', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} variant="danger" />
      );

      const button = getByTestId('button');
      expect(button.props.backgroundColor).toBe('$red8');
      expect(button.props.borderColor).toBe('$red9');
    });
  });

  describe('Tamaños', () => {
    it('debe aplicar tamaño medium por defecto', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} />
      );

      const button = getByTestId('button');
      expect(button.props.size).toBe('$4');
      expect(button.props.fontSize).toBe('$3');
    });

    it('debe aplicar tamaño small', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} size="small" />
      );

      const button = getByTestId('button');
      expect(button.props.size).toBe('$3');
      expect(button.props.fontSize).toBe('$2');
    });

    it('debe aplicar tamaño large', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} size="large" />
      );

      const button = getByTestId('button');
      expect(button.props.size).toBe('$5');
      expect(button.props.fontSize).toBe('$4');
    });
  });

  describe('Ancho completo', () => {
    it('debe aplicar width 100% cuando fullWidth es true', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} fullWidth={true} />
      );

      const button = getByTestId('button');
      expect(button.props.width).toBe('100%');
    });

    it('no debe aplicar width cuando fullWidth es false', () => {
      const { getByTestId } = render(
        <ButtonContainer {...defaultProps} fullWidth={false} />
      );

      const button = getByTestId('button');
      expect(button.props.width).toBeUndefined();
    });
  });
});

describe('ButtonPresentational', () => {
  const defaultProps = {
    children: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar correctamente', () => {
    const { getByText, getByTestId } = render(
      <ButtonPresentational {...defaultProps} />
    );

    expect(getByText('Test Button')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();
  });

  it('debe pasar todas las props de tamagui correctamente', () => {
    const tamaguiProps = {
      backgroundColor: '$red5',
      borderRadius: '$2',
      padding: '$3',
    };

    const { getByTestId } = render(
      <ButtonPresentational {...defaultProps} {...tamaguiProps} />
    );

    const button = getByTestId('button');
    expect(button.props.backgroundColor).toBe('$red5');
    expect(button.props.borderRadius).toBe('$2');
    expect(button.props.padding).toBe('$3');
  });

  it('debe llamar onPress cuando se presiona', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ButtonPresentational {...defaultProps} onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('debe estar deshabilitado cuando disabled es true', () => {
    const { getByTestId } = render(
      <ButtonPresentational {...defaultProps} disabled={true} />
    );

    const button = getByTestId('button');
    expect(button.props.disabled).toBe(true);
  });
}); 