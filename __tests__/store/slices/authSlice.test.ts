import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer, { 
  setLoading, 
  setUserToken, 
  setSelectedLanguage,
  loadLanguageFromStorage,
  saveLanguageToStorage,
  updateLanguageComplete
} from '../../../src/store/slices/authSlice';
import { SupportedLanguages } from '../../../src/i18n/types';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock i18n
jest.mock('../../../src/i18n/index', () => ({
  default: {
    language: 'es',
    changeLanguage: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('authSlice', () => {
  const initialState = {
    userToken: null,
    isLoading: true,
    selectedLanguage: 'es' as SupportedLanguages,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('setLoading action', () => {
    it('should handle setLoading with false', () => {
      const actualState = authReducer(initialState, setLoading(false));
      expect(actualState.isLoading).toBe(false);
      expect(actualState.userToken).toBe(initialState.userToken);
      expect(actualState.selectedLanguage).toBe(initialState.selectedLanguage);
    });

    it('should handle setLoading with true', () => {
      const stateWithLoadingFalse = { ...initialState, isLoading: false };
      const actualState = authReducer(stateWithLoadingFalse, setLoading(true));
      expect(actualState.isLoading).toBe(true);
      expect(actualState.userToken).toBe(initialState.userToken);
      expect(actualState.selectedLanguage).toBe(initialState.selectedLanguage);
    });
  });

  describe('setUserToken action', () => {
    it('should handle setUserToken with a token string', () => {
      const token = 'test-token-123';
      const actualState = authReducer(initialState, setUserToken(token));
      expect(actualState.userToken).toBe(token);
      expect(actualState.isLoading).toBe(initialState.isLoading);
      expect(actualState.selectedLanguage).toBe(initialState.selectedLanguage);
    });

    it('should handle setUserToken with null', () => {
      const stateWithToken = { ...initialState, userToken: 'existing-token' };
      const actualState = authReducer(stateWithToken, setUserToken(null));
      expect(actualState.userToken).toBe(null);
      expect(actualState.isLoading).toBe(initialState.isLoading);
      expect(actualState.selectedLanguage).toBe(initialState.selectedLanguage);
    });

    it('should handle setUserToken when replacing existing token', () => {
      const stateWithToken = { ...initialState, userToken: 'old-token' };
      const newToken = 'new-token-456';
      const actualState = authReducer(stateWithToken, setUserToken(newToken));
      expect(actualState.userToken).toBe(newToken);
    });
  });

  describe('setSelectedLanguage action', () => {
    it('should handle setSelectedLanguage with Spanish', () => {
      const stateWithEnglish = { ...initialState, selectedLanguage: 'en' as SupportedLanguages };
      const actualState = authReducer(stateWithEnglish, setSelectedLanguage('es'));
      expect(actualState.selectedLanguage).toBe('es');
      expect(actualState.userToken).toBe(initialState.userToken);
      expect(actualState.isLoading).toBe(initialState.isLoading);
    });

    it('should handle setSelectedLanguage with English', () => {
      const actualState = authReducer(initialState, setSelectedLanguage('en'));
      expect(actualState.selectedLanguage).toBe('en');
      expect(actualState.userToken).toBe(initialState.userToken);
      expect(actualState.isLoading).toBe(initialState.isLoading);
    });
  });

  describe('async thunks', () => {
    describe('loadLanguageFromStorage', () => {
      it('should dispatch setSelectedLanguage with Spanish when loaded from storage', async () => {
        mockAsyncStorage.getItem.mockResolvedValue('es');
        const dispatch = jest.fn();

        const thunk = loadLanguageFromStorage();
        await thunk(dispatch);

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@user_language');
        expect(dispatch).toHaveBeenCalledWith(setSelectedLanguage('es'));
      });

      it('should dispatch setSelectedLanguage with English when loaded from storage', async () => {
        mockAsyncStorage.getItem.mockResolvedValue('en');
        const dispatch = jest.fn();

        const thunk = loadLanguageFromStorage();
        await thunk(dispatch);

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@user_language');
        expect(dispatch).toHaveBeenCalledWith(setSelectedLanguage('en'));
      });

      it('should not dispatch anything when storage returns null', async () => {
        mockAsyncStorage.getItem.mockResolvedValue(null);
        const dispatch = jest.fn();

        const thunk = loadLanguageFromStorage();
        await thunk(dispatch);

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@user_language');
        expect(dispatch).not.toHaveBeenCalled();
      });

      it('should not dispatch anything when storage returns invalid language', async () => {
        mockAsyncStorage.getItem.mockResolvedValue('fr'); // Invalid language
        const dispatch = jest.fn();

        const thunk = loadLanguageFromStorage();
        await thunk(dispatch);

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@user_language');
        expect(dispatch).not.toHaveBeenCalled();
      });

      it('should handle AsyncStorage error gracefully', async () => {
        mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
        const dispatch = jest.fn();

        const thunk = loadLanguageFromStorage();
        await expect(thunk(dispatch)).resolves.not.toThrow();

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@user_language');
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('saveLanguageToStorage', () => {
      it('should save Spanish language to storage', async () => {
        mockAsyncStorage.setItem.mockResolvedValue();
        const dispatch = jest.fn();

        const thunk = saveLanguageToStorage('es');
        await thunk(dispatch);

        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'es');
      });

      it('should save English language to storage', async () => {
        mockAsyncStorage.setItem.mockResolvedValue();
        const dispatch = jest.fn();

        const thunk = saveLanguageToStorage('en');
        await thunk(dispatch);

        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'en');
      });

      it('should handle AsyncStorage setItem error gracefully', async () => {
        mockAsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));
        const dispatch = jest.fn();

        const thunk = saveLanguageToStorage('en');
        await expect(thunk(dispatch)).resolves.not.toThrow();

        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'en');
      });
    });

    describe('updateLanguageComplete', () => {
      it('should dispatch setSelectedLanguage and save to storage for Spanish', async () => {
        mockAsyncStorage.setItem.mockResolvedValue();
        const dispatch = jest.fn();

        const thunk = updateLanguageComplete('es');
        await thunk(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setSelectedLanguage('es'));
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'es');
      });

      it('should dispatch setSelectedLanguage and save to storage for English', async () => {
        mockAsyncStorage.setItem.mockResolvedValue();
        const dispatch = jest.fn();

        const thunk = updateLanguageComplete('en');
        await thunk(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setSelectedLanguage('en'));
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'en');
      });

      it('should dispatch setSelectedLanguage even if storage fails', async () => {
        mockAsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));
        const dispatch = jest.fn();

        const thunk = updateLanguageComplete('en');
        await thunk(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setSelectedLanguage('en'));
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('@user_language', 'en');
      });
    });
  });

  describe('state immutability', () => {
    it('should not mutate the original state when updating loading', () => {
      const originalState = { ...initialState };
      const newState = authReducer(initialState, setLoading(false));
      
      expect(initialState).toEqual(originalState);
      expect(newState).not.toBe(initialState);
    });

    it('should not mutate the original state when updating token', () => {
      const originalState = { ...initialState };
      const newState = authReducer(initialState, setUserToken('new-token'));
      
      expect(initialState).toEqual(originalState);
      expect(newState).not.toBe(initialState);
    });

    it('should not mutate the original state when updating language', () => {
      const originalState = { ...initialState };
      const newState = authReducer(initialState, setSelectedLanguage('en'));
      
      expect(initialState).toEqual(originalState);
      expect(newState).not.toBe(initialState);
    });
  });

  describe('complex state changes', () => {
    it('should handle multiple actions in sequence', () => {
      let state = authReducer(initialState, setLoading(false));
      state = authReducer(state, setUserToken('test-token'));
      state = authReducer(state, setSelectedLanguage('en'));

      expect(state).toEqual({
        userToken: 'test-token',
        isLoading: false,
        selectedLanguage: 'en',
      });
    });

    it('should maintain state integrity when actions are applied in different orders', () => {
      // Order 1
      let state1 = authReducer(initialState, setSelectedLanguage('en'));
      state1 = authReducer(state1, setUserToken('token1'));
      state1 = authReducer(state1, setLoading(false));

      // Order 2
      let state2 = authReducer(initialState, setLoading(false));
      state2 = authReducer(state2, setSelectedLanguage('en'));
      state2 = authReducer(state2, setUserToken('token1'));

      expect(state1).toEqual(state2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string token', () => {
      const actualState = authReducer(initialState, setUserToken(''));
      expect(actualState.userToken).toBe('');
    });

    it('should handle multiple loading state changes', () => {
      let state = authReducer(initialState, setLoading(false));
      state = authReducer(state, setLoading(true));
      state = authReducer(state, setLoading(false));

      expect(state.isLoading).toBe(false);
    });

    it('should handle multiple language changes', () => {
      let state = authReducer(initialState, setSelectedLanguage('en'));
      state = authReducer(state, setSelectedLanguage('es'));
      state = authReducer(state, setSelectedLanguage('en'));

      expect(state.selectedLanguage).toBe('en');
    });
  });
}); 