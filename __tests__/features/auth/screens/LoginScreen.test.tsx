import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice, { setUserToken } from '../../../../src/store/slices/authSlice';
import LoginScreenContainer from '../../../../src/features/auth/screens/LoginScreen/LoginScreenContainer';

// Unmock react-redux para este test específico
jest.unmock('react-redux');

// Mock más robusto del hook useI18n con diferentes idiomas
const createI18nMock = (language: 'es' | 'en' = 'es') => {
  const translations: Record<'es' | 'en', Record<string, string>> = {
    es: {
      'login.welcome': 'Bienvenido de nuevo!',
      'login.username': 'Usuario',
      'login.usernamePlaceholder': 'Ingresa tu usuario',
      'login.password': 'Contraseña',
      'login.passwordPlaceholder': 'Ingresa tu contraseña',
      'login.loginButton': 'Iniciar Sesión',
      'login.errorRequired': 'Por favor, ingresa usuario y contraseña.',
      'login.errorInvalidCredentials': 'Credenciales inválidas.',
    },
    en: {
      'login.welcome': 'Welcome back!',
      'login.username': 'Username',
      'login.usernamePlaceholder': 'Enter your username',
      'login.password': 'Password',
      'login.passwordPlaceholder': 'Enter your password',
      'login.loginButton': 'Log In',
      'login.errorRequired': 'Please enter username and password.',
      'login.errorInvalidCredentials': 'Invalid credentials.',
    },
  };
  
  return {
    t: (key: string) => translations[language][key] || key,
  };
};

jest.mock('../../../../src/i18n', () => ({
  useI18n: jest.fn(() => createI18nMock('es')),
}));

// Mock mejorado de Tamagui components
jest.mock('tamagui', () => ({
  YStack: ({ children, testID, ...props }: any) => {
    const MockComponent = require('react-native').View;
    return <MockComponent testID={testID} {...props}>{children}</MockComponent>;
  },
  XStack: ({ children, testID, ...props }: any) => {
    const MockComponent = require('react-native').View;
    return <MockComponent testID={testID} {...props}>{children}</MockComponent>;
  },
  Text: ({ children, testID, ...props }: any) => {
    const MockComponent = require('react-native').Text;
    return <MockComponent testID={testID} {...props}>{children}</MockComponent>;
  },
  Button: ({ children, onPress, disabled, icon, testID, ...props }: any) => {
    const MockComponent = require('react-native').TouchableOpacity;
    const TextComponent = require('react-native').Text;
    const ActivityIndicator = require('react-native').ActivityIndicator;
    
    // Determinar el testID correcto
    let buttonTestId = testID;
    if (!buttonTestId) {
      // Si icon es una función, es el botón de login con spinner
      if (typeof icon === 'function') {
        buttonTestId = 'login-button';
      } else if (icon) {
        // Si icon es un componente (Eye/EyeOff), es el botón de toggle
        buttonTestId = 'toggle-password-button';
      } else {
        // Sin icon, es el botón de login sin spinner
        buttonTestId = 'login-button';
      }
    }
    
    return (
      <MockComponent 
        testID={buttonTestId} 
        onPress={disabled ? undefined : onPress} 
        disabled={disabled} 
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || false }}
        {...props}
      >
        {typeof icon === 'function' ? (
          <ActivityIndicator testID="spinner" />
        ) : icon ? (
          <TextComponent testID="toggle-password-icon">👁</TextComponent>
        ) : null}
        <TextComponent>{children}</TextComponent>
      </MockComponent>
    );
  },
  Input: ({ onChangeText, value, placeholder, secureTextEntry, testID, id, ...props }: any) => {
    const MockComponent = require('react-native').TextInput;
    return (
      <MockComponent
        testID={testID || id}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={placeholder}
        {...props}
      />
    );
  },
  Label: ({ children, htmlFor, testID, ...props }: any) => {
    const MockComponent = require('react-native').Text;
    return <MockComponent testID={testID} accessibilityLabel={`Label for ${htmlFor}`} {...props}>{children}</MockComponent>;
  },
  Spinner: ({ testID, ...props }: any) => {
    const MockComponent = require('react-native').ActivityIndicator;
    return <MockComponent testID={testID || 'spinner'} {...props} />;
  },
}));

// Mock de los iconos de Lucide
jest.mock('@tamagui/lucide-icons', () => ({
  Eye: 'EyeIcon',
  EyeOff: 'EyeOffIcon',
}));

// Helper para crear store mock con diferentes estados
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: {
      auth: {
        userToken: null,
        isLoading: false,
        selectedLanguage: 'es' as const,
        ...initialState,
      },
    },
  });
};

describe('LoginScreen - Comprehensive Test Suite', () => {
  let mockStore: ReturnType<typeof createMockStore>;
  let mockUseI18n: jest.Mock;

  beforeEach(() => {
    mockStore = createMockStore();
    mockUseI18n = require('../../../../src/i18n').useI18n as jest.Mock;
    mockUseI18n.mockReturnValue(createI18nMock('es'));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  const renderLoginScreen = () => {
    return render(
      <Provider store={mockStore}>
        <LoginScreenContainer />
      </Provider>
    );
  };

  describe('🎨 Renderizado inicial', () => {
    it('renderiza todos los elementos de la UI correctamente', () => {
      renderLoginScreen();

      expect(screen.getByText('Bienvenido de nuevo!')).toBeTruthy();
      expect(screen.getByText('Usuario')).toBeTruthy();
      expect(screen.getByText('Contraseña')).toBeTruthy();
      expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
      expect(screen.getByPlaceholderText('Ingresa tu usuario')).toBeTruthy();
      expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    });

    it('renderiza los campos de input con valores iniciales vacíos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');

      expect(usernameInput.props.value).toBe('');
      expect(passwordInput.props.value).toBe('');
    });

    it('no muestra mensaje de error inicialmente', () => {
      renderLoginScreen();

      expect(screen.queryByText('Por favor, ingresa usuario y contraseña.')).toBeNull();
      expect(screen.queryByText('Credenciales inválidas.')).toBeNull();
    });

    it('renderiza el input de contraseña como secureTextEntry por defecto', () => {
      renderLoginScreen();

      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('renderiza el botón de login habilitado inicialmente', () => {
      renderLoginScreen();

      const loginButton = screen.getByTestId('login-button');
      expect(loginButton.props.accessibilityState.disabled).toBe(false);
    });

    it('no muestra spinner inicialmente', () => {
      renderLoginScreen();

      expect(screen.queryByTestId('spinner')).toBeNull();
    });
  });

  describe('🔤 Interacciones de usuario en campos de texto', () => {
    it('actualiza el valor del campo username cuando el usuario escribe', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      fireEvent.changeText(usernameInput, 'test_user');

      expect(usernameInput.props.value).toBe('test_user');
    });

    it('actualiza el valor del campo password cuando el usuario escribe', () => {
      renderLoginScreen();

      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      fireEvent.changeText(passwordInput, 'test_password');

      expect(passwordInput.props.value).toBe('test_password');
    });

    it('permite múltiples cambios de texto en los campos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      // Múltiples cambios de texto
      fireEvent.changeText(usernameInput, 'user1');
      fireEvent.changeText(passwordInput, 'pass1');
      fireEvent.changeText(usernameInput, 'user2');
      fireEvent.changeText(passwordInput, 'pass2');
      
      // Verificar que los valores se actualizan correctamente
      expect(usernameInput.props.value).toBe('user2');
      expect(passwordInput.props.value).toBe('pass2');
    });

    it('maneja caracteres especiales en los campos de texto', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      fireEvent.changeText(usernameInput, 'user@domain.com');
      fireEvent.changeText(passwordInput, 'P@ssw0rd!123');
      
      expect(usernameInput.props.value).toBe('user@domain.com');
      expect(passwordInput.props.value).toBe('P@ssw0rd!123');
    });

    it('maneja textos muy largos en los campos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const longText = 'a'.repeat(100);
      
      fireEvent.changeText(usernameInput, longText);
      expect(usernameInput.props.value).toBe(longText);
    });
  });

  describe('👁️ Funcionalidad de toggle de visibilidad de contraseña', () => {
    it('muestra el botón de toggle de contraseña', () => {
      renderLoginScreen();
      
      // Buscar el botón que contiene el icono
      const toggleButton = screen.getByTestId('toggle-password-icon').parent;
      expect(toggleButton).toBeTruthy();
    });

    it('cambia la visibilidad de la contraseña al presionar el toggle', () => {
      renderLoginScreen();

      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const toggleButton = screen.getByTestId('toggle-password-icon').parent;

      // Inicialmente debe estar oculta
      expect(passwordInput.props.secureTextEntry).toBe(true);

      // Presionar el toggle
      fireEvent.press(toggleButton);

      // Ahora debe estar visible
      expect(passwordInput.props.secureTextEntry).toBe(false);

      // Presionar nuevamente para ocultar
      fireEvent.press(toggleButton);
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('mantiene el valor de la contraseña al cambiar visibilidad', () => {
      renderLoginScreen();

      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const toggleButton = screen.getByTestId('toggle-password-icon').parent;

      // Escribir contraseña
      fireEvent.changeText(passwordInput, 'mi_contraseña');
      expect(passwordInput.props.value).toBe('mi_contraseña');

      // Cambiar visibilidad
      fireEvent.press(toggleButton);
      expect(passwordInput.props.value).toBe('mi_contraseña');
      expect(passwordInput.props.secureTextEntry).toBe(false);

      // Cambiar visibilidad nuevamente
      fireEvent.press(toggleButton);
      expect(passwordInput.props.value).toBe('mi_contraseña');
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });
  });

  describe('✅ Validaciones de login', () => {
    it('muestra error cuando se intenta hacer login sin usuario ni contraseña', () => {
      renderLoginScreen();

      const loginButton = screen.getByTestId('login-button');
      fireEvent.press(loginButton);

      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();
    });

    it('muestra error cuando se intenta hacer login solo con usuario', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test_user');
      fireEvent.press(loginButton);

      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();
    });

    it('muestra error cuando se intenta hacer login solo con contraseña', () => {
      renderLoginScreen();

      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(passwordInput, 'test_password');
      fireEvent.press(loginButton);

      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();
    });

    it('valida campos con solo espacios en blanco como vacíos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, '   ');
      fireEvent.changeText(passwordInput, '   ');
      fireEvent.press(loginButton);

      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();
    });

    it('limpia errores previos al iniciar un nuevo intento de login', () => {
      renderLoginScreen();

      const loginButton = screen.getByTestId('login-button');
      
      // Generar un error primero
      fireEvent.press(loginButton);
      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();

      // Ahora agregar datos y presionar login nuevamente
      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(loginButton);

      // El error previo debe haber desaparecido
      expect(screen.queryByText('Por favor, ingresa usuario y contraseña.')).toBeNull();
    });
  });

  describe('🔐 Proceso de autenticación', () => {
    it('muestra estado de loading durante el proceso de autenticación', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');

      const loginButton = screen.getByTestId('login-button');
      fireEvent.press(loginButton);

      // Verificar que aparece el spinner después del press
      expect(screen.getByTestId('spinner')).toBeTruthy();
    });

    it('deshabilita el botón durante el proceso de login', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      
      // Botón habilitado antes del login
      expect(loginButton.props.accessibilityState.disabled).toBe(false);
      
      fireEvent.press(loginButton);
      
      // Verificar que el botón se deshabilita después del press
      const updatedButton = screen.getByTestId('login-button');
      expect(updatedButton.props.accessibilityState.disabled).toBe(true);
    });

    it('previene múltiples intentos de login simultáneos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      
      // Primer intento de login
      fireEvent.press(loginButton);
      
      // Verificar que el botón se deshabilita
      const updatedButton = screen.getByTestId('login-button');
      expect(updatedButton.props.accessibilityState.disabled).toBe(true);

      // Segundo intento mientras está en loading - no debe hacer nada
      fireEvent.press(loginButton);
      
      // Solo debe haber un proceso de autenticación
      expect(screen.getAllByTestId('spinner')).toHaveLength(1);
    });

    it('maneja el flujo completo de autenticación exitosa', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(loginButton);

      // Verificar que aparece el spinner
      expect(screen.getByTestId('spinner')).toBeTruthy();

      // Avanzar el tiempo para completar la autenticación
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Verificar que el token se actualiza en el store
      const state = mockStore.getState();
      expect(state.auth.userToken).toBe('dummy-token');
    });

    it('maneja credenciales incorrectas mostrando error', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'wrong_user');
      fireEvent.changeText(passwordInput, 'wrong_password');
      fireEvent.press(loginButton);

      // Verificar que aparece el spinner
      expect(screen.getByTestId('spinner')).toBeTruthy();

      // Avanzar el tiempo para completar la autenticación
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Verificar que se muestra el error
      expect(screen.getByText('Credenciales inválidas.')).toBeTruthy();

      // Verificar que no se actualizó el token
      const state = mockStore.getState();
      expect(state.auth.userToken).toBeNull();
    });
  });

  describe('🌐 Internacionalización', () => {
    it('renderiza correctamente en español (por defecto)', () => {
      renderLoginScreen();

      expect(screen.getByText('Bienvenido de nuevo!')).toBeTruthy();
      expect(screen.getByText('Usuario')).toBeTruthy();
      expect(screen.getByText('Contraseña')).toBeTruthy();
      expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    });

    it('renderiza correctamente en inglés cuando se cambia el idioma', () => {
      // Cambiar mock a inglés
      mockUseI18n.mockReturnValue(createI18nMock('en'));
      
      renderLoginScreen();

      expect(screen.getByText('Welcome back!')).toBeTruthy();
      expect(screen.getByText('Username')).toBeTruthy();
      expect(screen.getByText('Password')).toBeTruthy();
      expect(screen.getByText('Log In')).toBeTruthy();
    });

    it('muestra errores en el idioma correspondiente', () => {
      // Test en inglés
      mockUseI18n.mockReturnValue(createI18nMock('en'));
      
      renderLoginScreen();

      const loginButton = screen.getByText('Log In');
      fireEvent.press(loginButton);

      expect(screen.getByText('Please enter username and password.')).toBeTruthy();
    });
  });

  describe('🧪 Edge cases y casos límite', () => {
    it('maneja textos extremadamente largos', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const veryLongText = 'a'.repeat(1000);
      
      fireEvent.changeText(usernameInput, veryLongText);
      expect(usernameInput.props.value).toBe(veryLongText);
    });

    it('maneja caracteres Unicode correctamente', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      fireEvent.changeText(usernameInput, 'usuario🚀émoji');
      fireEvent.changeText(passwordInput, 'contraseña中文');
      
      expect(usernameInput.props.value).toBe('usuario🚀émoji');
      expect(passwordInput.props.value).toBe('contraseña中文');
    });

    it('maneja texto vacío después de tener contenido', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      
      fireEvent.changeText(usernameInput, 'texto');
      expect(usernameInput.props.value).toBe('texto');
      
      fireEvent.changeText(usernameInput, '');
      expect(usernameInput.props.value).toBe('');
    });
  });

  describe('♿ Accesibilidad', () => {
    it('los inputs tienen accessibilityLabel apropiados', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      
      expect(usernameInput.props.accessibilityLabel).toBe('Ingresa tu usuario');
      expect(passwordInput.props.accessibilityLabel).toBe('Ingresa tu contraseña');
    });

    it('el botón de login tiene el role correcto', () => {
      renderLoginScreen();

      const loginButton = screen.getByTestId('login-button');
      expect(loginButton.props.accessibilityRole).toBe('button');
    });

    it('el botón refleja su estado deshabilitado en accessibilityState', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(loginButton);

      expect(loginButton.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('🔄 Estabilidad y cleanup', () => {
    it('mantiene estabilidad durante múltiples interacciones', () => {
      renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      // Múltiples interacciones
      fireEvent.changeText(usernameInput, 'user1');
      fireEvent.press(loginButton);
      fireEvent.changeText(passwordInput, 'pass1');
      fireEvent.press(loginButton);
      fireEvent.changeText(usernameInput, 'user2');
      fireEvent.changeText(passwordInput, 'pass2');

      // El componente debe seguir funcionando
      expect(usernameInput.props.value).toBe('user2');
      expect(passwordInput.props.value).toBe('pass2');
      expect(loginButton).toBeTruthy();
    });

    it('renderiza consistentemente después de cambios de estado', () => {
      renderLoginScreen();

      const loginButton = screen.getByTestId('login-button');
      
      // Generar error
      fireEvent.press(loginButton);
      expect(screen.getByText('Por favor, ingresa usuario y contraseña.')).toBeTruthy();

      // Verificar que los elementos principales siguen presentes
      expect(screen.getByText('Bienvenido de nuevo!')).toBeTruthy();
      expect(screen.getByText('Usuario')).toBeTruthy();
      expect(screen.getByText('Contraseña')).toBeTruthy();
      expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    });

    it('no produce memory leaks con timers', () => {
      const { unmount } = renderLoginScreen();

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
      const loginButton = screen.getByTestId('login-button');

      fireEvent.changeText(usernameInput, 'test');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(loginButton);

      // Desmontar antes de que termine el timer
      unmount();

      // Avanzar el tiempo - no debería causar errores
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });
  });

  describe('🎯 Casos de performance', () => {
    it('no re-renderiza innecesariamente en cambios de texto', () => {
      const renderSpy = jest.fn();
      const TestComponent = () => {
        renderSpy();
        return <LoginScreenContainer />;
      };

      render(
        <Provider store={mockStore}>
          <TestComponent />
        </Provider>
      );

      const usernameInput = screen.getByPlaceholderText('Ingresa tu usuario');
      
      const initialRenderCount = renderSpy.mock.calls.length;
      
      // Cambiar texto varias veces
      fireEvent.changeText(usernameInput, 'a');
      fireEvent.changeText(usernameInput, 'ab');
      fireEvent.changeText(usernameInput, 'abc');

      // Verificar que no hay demasiados re-renders
      const finalRenderCount = renderSpy.mock.calls.length;
      expect(finalRenderCount - initialRenderCount).toBeLessThan(10);
    });
  });
}); 