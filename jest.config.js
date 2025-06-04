module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-redux|tamagui|@tamagui/.*|react-i18next))'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  // Configuración de entorno para tests
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/node_modules/react-native/jest/setup.js'],
  // Configurar variables de entorno para tests
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  globals: {
    'process.env.NODE_ENV': 'test'
  },
  // Silenciar logs durante las pruebas
  silent: false,
  verbose: false,
}; 