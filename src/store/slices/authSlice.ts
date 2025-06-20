import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguages } from '../../i18n/types';

interface AuthState {
  userToken: string | null;
  isLoading: boolean;
  selectedLanguage: SupportedLanguages;
}

const LANGUAGE_STORAGE_KEY = '@user_language';

const initialState: AuthState = {
  userToken: null,
  isLoading: true,
  selectedLanguage: 'es', // idioma por defecto
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
    },
    setSelectedLanguage: (state, action: PayloadAction<SupportedLanguages>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

// Función para cargar el idioma desde AsyncStorage
export const loadLanguageFromStorage = () => async (dispatch: any) => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      // Actualizar Redux
      dispatch(setSelectedLanguage(savedLanguage as SupportedLanguages));
      
      // Sincronizar i18n inmediatamente - importación dinámica para evitar circular dependency
      const i18n = require('../../i18n/index').default;
      if (i18n.language !== savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }
    }
  } catch (error) {
    // En caso de error, mantener el idioma por defecto
  }
};

// Función para guardar el idioma en AsyncStorage (Redux ya está actualizado)
export const saveLanguageToStorage = (language: SupportedLanguages) => async (dispatch: any) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Si falla el guardado, no hacemos nada más ya que Redux está actualizado
  }
};


export const updateLanguageComplete = (language: SupportedLanguages) => async (dispatch: any) => {
  try {
    dispatch(setSelectedLanguage(language));
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Silently handle error, keep Redux state updated
  }
};

export const { setLoading, setUserToken, setSelectedLanguage } = authSlice.actions;
export default authSlice.reducer; 