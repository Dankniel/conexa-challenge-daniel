import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selectores básicos
export const selectAuthState = (state: RootState) => state.auth;

export const selectUserToken = createSelector(
  [selectAuthState],
  (authState) => authState.userToken
);

export const selectIsLoading = createSelector(
  [selectAuthState],
  (authState) => authState.isLoading
);

export const selectSelectedLanguage = createSelector(
  [selectAuthState],
  (authState) => authState.selectedLanguage
);

export const selectIsAuthenticated = createSelector(
  [selectUserToken],
  (userToken) => !!userToken
); 