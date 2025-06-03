import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  setPosts,
  setSearchQuery,
  clearSearch,
  loadFavorites,
  toggleFavoriteWithPersistence,
} from '../../../store/slices/postsSlice';
import {
  selectPostsToDisplay,
  selectFavoritePosts,
  selectSearchQuery,
  selectIsLoadingFavorites,
  selectFavoritesCount,
  selectIsPostFavorite,
  selectFavoriteIds,
} from '../../../store/selectors/postsSelectors';
import { useGetPostsQuery } from '../../../store/api';
import { JsonPlaceholderPost } from '../../../store/api/postsApi';

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: apiPosts, error, isLoading } = useGetPostsQuery();
  
  const postsToDisplay = useSelector(selectPostsToDisplay);
  const searchQuery = useSelector(selectSearchQuery);
  
  // Actualizar posts en el store cuando se obtienen de la API
  useEffect(() => {
    if (apiPosts) {
      dispatch(setPosts(apiPosts));
    }
  }, [apiPosts, dispatch]);
  
  const handleSearch = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);
  
  const handleClearSearch = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);
  
  return {
    posts: postsToDisplay,
    searchQuery,
    isLoading,
    error,
    handleSearch,
    handleClearSearch,
  };
};

// Hook para inicializar la aplicación
export const useAppInitialization = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    // Cargar favoritos al inicializar la app, pero de manera no bloqueante
    dispatch(loadFavorites());
  }, [dispatch]);
};

// Hook optimizado solo para el contador - no carga datos adicionales
export const useFavoritesCount = () => {
  const favoritesCount = useSelector(selectFavoritesCount);
  return { favoritesCount };
};

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const favoritePosts = useSelector(selectFavoritePosts);
  const favoritesCount = useSelector(selectFavoritesCount);
  const isLoadingFavorites = useSelector(selectIsLoadingFavorites);
  
  const toggleFavorite = useCallback((postId: string) => {
    dispatch(toggleFavoriteWithPersistence(postId));
  }, [dispatch]);
  
  return {
    favoritePosts,
    favoritesCount,
    isLoadingFavorites,
    toggleFavorite,
  };
};

export const usePostFavorite = (postId: string) => {
  const isFavorite = useSelector((state: RootState) => selectIsPostFavorite(state, postId));
  const { toggleFavorite: toggleFavoriteBase } = useFavorites();
  
  const toggleFavorite = useCallback(() => {
    toggleFavoriteBase(postId);
  }, [toggleFavoriteBase, postId]);
  
  return {
    isFavorite,
    toggleFavorite,
  };
}; 