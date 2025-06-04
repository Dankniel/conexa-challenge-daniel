// Setup básico para Jest

// Polyfill para clearImmediate y setImmediate que React Native necesita
global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
global.clearImmediate = global.clearImmediate || global.clearTimeout;

// Silenciar logs de Tamagui y otros warnings
console.warn = jest.fn();
console.error = jest.fn();
// También silenciar console.log para evitar logs de i18next
const originalLog = console.log;
console.log = jest.fn();

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock de expo-localization
jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [
    {
      languageCode: 'es',
      regionCode: 'ES',
      languageTag: 'es-ES',
    },
  ]),
}));

// Mock del archivo principal de i18n para desactivar debug
jest.mock('./src/i18n/index.ts', () => ({
  default: {
    init: jest.fn(() => Promise.resolve()),
    use: jest.fn(() => ({ init: jest.fn(() => Promise.resolve()) })),
    t: jest.fn((key) => key),
    changeLanguage: jest.fn(() => Promise.resolve()),
    language: 'es',
    isInitialized: true,
  },
  useI18n: () => ({
    t: (key) => key,
    changeLanguage: jest.fn(),
    getCurrentLanguage: jest.fn(() => 'es'),
    isLanguageRTL: jest.fn(() => false),
  }),
  translate: jest.fn((key) => key),
}));

// Mock de react-i18next con debug desactivado
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'es',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock de i18next para silenciar logs
jest.mock('i18next', () => ({
  init: jest.fn(() => Promise.resolve()),
  use: jest.fn(() => ({ init: jest.fn(() => Promise.resolve()) })),
  t: jest.fn((key) => key),
  changeLanguage: jest.fn(() => Promise.resolve()),
  language: 'es',
  isInitialized: true,
  // Silenciar logs de debug
  debug: false,
}));

// Mock completo de Tamagui para prevenir procesamiento
jest.mock('tamagui', () => {
  const React = require('react');
  return {
    YStack: ({ children, ...props }) => React.createElement('View', props, children),
    XStack: ({ children, ...props }) => React.createElement('View', props, children),
    Text: ({ children, ...props }) => React.createElement('Text', props, children),
    Button: ({ children, onPress, ...props }) => 
      React.createElement('TouchableOpacity', { onPress, ...props }, children),
    Input: ({ onChangeText, value, ...props }) => 
      React.createElement('TextInput', { onChangeText, value, ...props }),
    Label: ({ children, ...props }) => React.createElement('Text', props, children),
    Spinner: (props) => React.createElement('ActivityIndicator', props),
    // Mock de la configuración de Tamagui
    TamaguiProvider: ({ children }) => children,
    createTamagui: () => ({}),
    config: {},
  };
});

// Mock del config de Tamagui
jest.mock('./tamagui.config.ts', () => ({
  default: {},
  config: {},
}));

// Mock de iconos de Tamagui
jest.mock('@tamagui/lucide-icons', () => {
  const React = require('react');
  return {
    Eye: (props) => React.createElement('Text', props, 'Eye'),
    EyeOff: (props) => React.createElement('Text', props, 'EyeOff'),
  };
});

// Mock de react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({
    userToken: null,
    isLoading: false,
    selectedLanguage: 'es',
  })),
  useDispatch: () => jest.fn(),
  Provider: ({ children }) => children,
}));

// Setup global
global.__DEV__ = false; // Importante: desactivar __DEV__ para silenciar logs 