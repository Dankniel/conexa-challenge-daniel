import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface UsersState {
  selectedUser: User | null;
  filters: {
    searchTerm: string;
    sortBy: 'name' | 'email' | 'company';
    sortOrder: 'asc' | 'desc';
  };
  ui: {
    isRefreshing: boolean;
  };
}

const initialState: UsersState = {
  selectedUser: null,
  filters: {
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  ui: {
    isRefreshing: false,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'email' | 'company'>) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sortOrder = action.payload;
    },
    setIsRefreshing: (state, action: PayloadAction<boolean>) => {
      state.ui.isRefreshing = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSelectedUser,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setIsRefreshing,
  resetFilters,
} = usersSlice.actions;

export default usersSlice.reducer; 