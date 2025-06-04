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
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Archivos de tu carpeta src
    '!src/**/*.d.ts',           // Excluir archivos de definición de TypeScript
    '!src/**/index.{js,ts}',    // Podrías excluir archivos index si son solo re-exportaciones
    '!src/types/**/*',          // Excluir una carpeta de tipos
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10, // Un valor negativo permite un descenso de X% sin fallar
    },}
}; 