import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../../types/user';

// Selectores básicos
export const selectUsersState = (state: RootState) => state.users;

export const selectSelectedUser = createSelector(
  [selectUsersState],
  (usersState) => usersState.selectedUser
);

export const selectFilters = createSelector(
  [selectUsersState],
  (usersState) => usersState.filters
);

export const selectSearchTerm = createSelector(
  [selectFilters],
  (filters) => filters.searchTerm
);

export const selectSortBy = createSelector(
  [selectFilters],
  (filters) => filters.sortBy
);

export const selectSortOrder = createSelector(
  [selectFilters],
  (filters) => filters.sortOrder
);

export const selectUiState = createSelector(
  [selectUsersState],
  (usersState) => usersState.ui
);

export const selectIsRefreshing = createSelector(
  [selectUiState],
  (ui) => ui.isRefreshing
);

// Selectores complejos con lógica de filtrado y ordenamiento
export const selectFilteredAndSortedUsers = createSelector(
  [
    (state: RootState, users: User[]) => users,
    selectSearchTerm,
    selectSortBy,
    selectSortOrder
  ],
  (users, searchTerm, sortBy, sortOrder) => {
    let filteredUsers = users;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredUsers = users.filter(user => 
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term)
      );
    }

    // Ordenar usuarios
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortBy) {
        case 'name':
          aValue = `${a.firstname} ${a.lastname}`.toLowerCase();
          bValue = `${b.firstname} ${b.lastname}`.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'company':
          aValue = a.company.name.toLowerCase();
          bValue = b.company.name.toLowerCase();
          break;
        default:
          return 0;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sortedUsers;
  }
); 