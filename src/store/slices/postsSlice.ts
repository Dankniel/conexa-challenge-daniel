import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JsonPlaceholderPost } from '../api/postsApi';

export interface PostsState {
  posts: JsonPlaceholderPost[];
  favoriteIds: string[];
  searchQuery: string;
  filteredPosts: JsonPlaceholderPost[];
  isLoadingFavorites: boolean;
}

const initialState: PostsState = {
  posts: [],
  favoriteIds: [],
  searchQuery: '',
  filteredPosts: [],
  isLoadingFavorites: false,
};

const FAVORITES_STORAGE_KEY = '@favorites_posts';

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<JsonPlaceholderPost[]>) => {
      state.posts = action.payload;
      state.filteredPosts = filterPosts(action.payload, state.searchQuery);
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredPosts = filterPosts(state.posts, action.payload);
    },
    
    setFavoriteIds: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
    
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const isCurrentlyFavorite = state.favoriteIds.includes(postId);
      
      if (isCurrentlyFavorite) {
        state.favoriteIds = state.favoriteIds.filter(id => id !== postId);
      } else {
        state.favoriteIds = [...state.favoriteIds, postId];
      }
    },
    
    setLoadingFavorites: (state, action: PayloadAction<boolean>) => {
      state.isLoadingFavorites = action.payload;
    },
    
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredPosts = state.posts;
    },
  },
});

const filterPosts = (posts: JsonPlaceholderPost[], query: string): JsonPlaceholderPost[] => {
  if (!query.trim()) {
    return posts;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  return posts.filter(post => 
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.content.toLowerCase().includes(normalizedQuery)
  );
};

export const loadFavorites = () => async (dispatch: any, getState: any) => {
  try {
    const currentState = getState();
    
    // Si ya estamos cargando favoritos, no hacer nada
    if (currentState.posts.isLoadingFavorites) {
      return;
    }
    
    // Si ya tenemos favoritos cargados, no recargar
    if (currentState.posts.favoriteIds.length > 0) {
      return;
    }
    
    dispatch(setLoadingFavorites(true));
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
    dispatch(setFavoriteIds(favoriteIds));
  } catch (error) {
    console.error('Error loading favorites from AsyncStorage:', error);
    dispatch(setFavoriteIds([]));
  } finally {
    dispatch(setLoadingFavorites(false));
  }
};

export const saveFavorites = (favoriteIds: string[]) => async () => {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.error('Error saving favorites to AsyncStorage:', error);
  }
};

export const toggleFavoriteWithPersistence = (postId: string) => async (dispatch: any, getState: any) => {
  dispatch(toggleFavorite(postId));
  const { posts } = getState();
  await dispatch(saveFavorites(posts.favoriteIds));
};

export const {
  setPosts,
  setSearchQuery,
  setFavoriteIds,
  toggleFavorite,
  setLoadingFavorites,
  clearSearch,
} = postsSlice.actions;

export default postsSlice.reducer; 