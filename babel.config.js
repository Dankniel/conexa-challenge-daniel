module.exports = function(api) {
  api.cache(true);
  
  const isTest = process.env.NODE_ENV === 'test';
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-flow-strip-types',
      // Solo incluir el plugin de Tamagui si NO estamos en entorno de test
      ...(!isTest ? [
        [
          '@tamagui/babel-plugin',
          {
            components: ['tamagui'],
            config: './tamagui.config.ts',
            logTimings: false, // Desactivar logs para reducir output
            disableExtraction: process.env.NODE_ENV === 'development',
          },
        ]
      ] : []),
    ],
  };
}; 