import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config/v3';
import { createTokens } from '@tamagui/core';

// Definir tokens de colores personalizados
const customTokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,
    // Colores púrpura personalizados
    purple1: '#0a0612',
    purple2: '#1a1028',
    purple3: '#2d1b48',
    purple4: '#3e2465',
    purple5: '#4f2e7d',
    purple6: '#603896',
    purple7: '#7244af',
    purple8: '#8450c8',
    purple9: '#9c6de0',
    purple10: '#b388f5',
    purple11: '#cba4ff',
    purple12: '#e4c1ff',
    
    // Grises oscuros
    gray1: '#0a0a0a',
    gray2: '#1a1a1a',
    gray3: '#2a2a2a',
    gray4: '#3a3a3a',
    gray5: '#4a4a4a',
    gray6: '#5a5a5a',
    gray7: '#6a6a6a',
    gray8: '#7a7a7a',
    gray9: '#8a8a8a',
    gray10: '#9a9a9a',
    gray11: '#aaaaaa',
    gray12: '#ffffff',
  },
});

// Crear temas personalizados
const customThemes = {
  ...config.themes,
  dark_purple: {
    background: customTokens.color.purple1,
    backgroundHover: customTokens.color.purple2,
    backgroundPress: customTokens.color.purple3,
    backgroundFocus: customTokens.color.purple2,
    borderColor: customTokens.color.purple4,
    borderColorHover: customTokens.color.purple5,
    borderColorPress: customTokens.color.purple6,
    borderColorFocus: customTokens.color.purple5,
    color: customTokens.color.gray12,
    colorHover: customTokens.color.gray11,
    colorPress: customTokens.color.gray10,
    colorFocus: customTokens.color.gray12,
    placeholderColor: customTokens.color.gray8,
    // Colores para botones activos
    color1: customTokens.color.purple1,
    color2: customTokens.color.purple2,
    color3: customTokens.color.purple3,
    color4: customTokens.color.purple4,
    color5: customTokens.color.purple5,
    color6: customTokens.color.purple6,
    color7: customTokens.color.purple7,
    color8: customTokens.color.purple8,
    color9: customTokens.color.purple9,
    color10: customTokens.color.purple10,
    color11: customTokens.color.purple11,
    color12: customTokens.color.purple12,
  }
};

const tamaguiConfig = createTamagui({
  ...config,
  tokens: customTokens,
  themes: customThemes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
} 