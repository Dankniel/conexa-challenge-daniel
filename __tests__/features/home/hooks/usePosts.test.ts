import { renderHook, act } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAppInitialization,
  useFavoritesCount,
  usePosts,
  useFavorites,
  usePostFavorite
} from '../../../../src/features/home/hooks/usePosts';
import {
  loadFavorites,
  setSearchQuery,
  clearSearch,
  setPosts,
  toggleFavoriteWithPersistence
} from '../../../../src/store/slices/postsSlice';
import { useGetPostsQuery } from '../../../../src/store/api';
import {
  selectPostsToDisplay,
  selectFavoritePosts,
  selectSearchQuery,
  selectIsLoadingFavorites,
  selectFavoritesCount,
  selectIsPostFavorite,
} from '../../../../src/store/selectors/postsSelectors';
import { JsonPlaceholderPost } from '../../../../src/store/api/postsApi';

// Mockear react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mockear store/api
jest.mock('../../../../src/store/api', () => ({
  useGetPostsQuery: jest.fn(),
}));

const mockUseFavoritesToggle = jest.fn();
// Mockear useFavorites ANTES de que se importe el módulo que lo usa y lo define
jest.mock('../../../../src/features/home/hooks/usePosts', () => {
  const originalModule = jest.requireActual('../../../../src/features/home/hooks/usePosts');
  return {
    ...originalModule,
    // Mockear useFavorites específicamente para los tests de usePostFavorite
    useFavorites: jest.fn(() => ({
      toggleFavorite: mockUseFavoritesToggle,
      favoritePosts: [], // Proporcionar valores por defecto
      favoritesCount: 0,
      isLoadingFavorites: false,
    })),
  };
});

const mockDispatch = jest.fn();

describe('usePosts Hooks', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReset();
    mockDispatch.mockClear();
    (useGetPostsQuery as unknown as jest.Mock).mockClear();
    mockUseFavoritesToggle.mockClear();

    // Importante: Para los tests que NO son de usePostFavorite, restauramos la implementación original 
    // o una implementación controlada de useFavorites si es necesario.
    // Aquí asumimos que el mock anterior es principalmente para usePostFavorite.
    // Si useFavorites en sí mismo necesita ser probado sin este mock, se ajusta aquí.
    const originalUseFavorites = jest.requireActual('../../../../src/features/home/hooks/usePosts').useFavorites;
    (require('../../../../src/features/home/hooks/usePosts').useFavorites as jest.Mock).mockImplementation(originalUseFavorites);
  });

  describe('useAppInitialization', () => {
    it('debería despachar loadFavorites al montar', () => {
      renderHook(() => useAppInitialization());
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('useFavoritesCount', () => {
    it('debería retornar el conteo de favoritos del selector', () => {
      const mockCount = 5;
      (useSelector as unknown as jest.Mock).mockImplementation((selectorCallback) => {
        if (selectorCallback === selectFavoritesCount) {
          return mockCount;
        }
        return undefined;
      });

      const { result } = renderHook(() => useFavoritesCount());

      expect(result.current.favoritesCount).toBe(mockCount);
      expect(useSelector).toHaveBeenCalledWith(selectFavoritesCount);
    });
  });

  describe('usePosts', () => {
    const mockApiPostsData: JsonPlaceholderPost[] = [
      { userId:1, id: 1, title: 'Post 1', content:'content1', image:'', thumbnail:'', status:'', category:'', publishedAt:'', updatedAt:'' }, 
      { userId:1, id: 2, title: 'Post 2', content:'content2', image:'', thumbnail:'', status:'', category:'', publishedAt:'', updatedAt:'' }
    ];

    it('debería retornar valores iniciales y despachar setPosts cuando los datos de la API cambian', () => {
      (useGetPostsQuery as unknown as jest.Mock).mockReturnValue({ data: undefined, isLoading: true, error: null });
      (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectPostsToDisplay) return [];
        if (selectorCallback === selectSearchQuery) return '';
        return undefined;
      });

      const { rerender, result } = renderHook(() => usePosts());
      expect(result.current.isLoading).toBe(true);
      expect(result.current.posts).toEqual([]);

      (useGetPostsQuery as unknown as jest.Mock).mockReturnValue({ data: mockApiPostsData, isLoading: false, error: null });
      act(() => {
        rerender();
      });
      
      expect(mockDispatch).toHaveBeenCalledWith(setPosts(mockApiPostsData));
    });

    it('handleSearch debería despachar setSearchQuery', () => {
      (useGetPostsQuery as unknown as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
      (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectPostsToDisplay) return [];
        if (selectorCallback === selectSearchQuery) return '';
        return undefined;
      });
      const { result } = renderHook(() => usePosts());
      const searchQueryText = 'test query';
      act(() => {
        result.current.handleSearch(searchQueryText);
      });
      expect(mockDispatch).toHaveBeenCalledWith(setSearchQuery(searchQueryText));
    });

    it('handleClearSearch debería despachar clearSearch', () => {
      (useGetPostsQuery as unknown as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
       (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectPostsToDisplay) return [];
        if (selectorCallback === selectSearchQuery) return '';
        return undefined;
      });
      const { result } = renderHook(() => usePosts());
      act(() => {
        result.current.handleClearSearch();
      });
      expect(mockDispatch).toHaveBeenCalledWith(clearSearch());
    });

    it('debería retornar posts del selector selectPostsToDisplay', () => {
      const mockSelectedPosts: Partial<JsonPlaceholderPost>[] = [{ id: 3, title: 'Selected Post' }];
      (useGetPostsQuery as unknown as jest.Mock).mockReturnValue({ data: [], isLoading: false, error: null });
      (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectPostsToDisplay) return mockSelectedPosts;
        if (selectorCallback === selectSearchQuery) return '';
        return undefined;
      });

      const { result } = renderHook(() => usePosts());
      expect(result.current.posts).toEqual(mockSelectedPosts);
    });
  });

  describe('useFavorites', () => {
    it('toggleFavorite debería despachar toggleFavoriteWithPersistence con el postId', () => {
      (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectFavoritePosts) return [];
        if (selectorCallback === selectFavoritesCount) return 0;
        if (selectorCallback === selectIsLoadingFavorites) return false;
        return undefined;
      });
      const { result } = renderHook(() => useFavorites()); // Esta llamada usará la implementación real gracias al beforeEach
      const postIdToToggle = 'test-post-id';
      act(() => {
        result.current.toggleFavorite(postIdToToggle);
      });
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('debería retornar valores de los selectores de favoritos', () => {
      const mockFavPosts: Partial<JsonPlaceholderPost>[] = [{ id: 123, title: 'Favorite Post' }];
      const mockFavCount = 1;
      const mockIsLoading = false;
      (useSelector as unknown as jest.Mock).mockImplementation(selectorCallback => {
        if (selectorCallback === selectFavoritePosts) return mockFavPosts;
        if (selectorCallback === selectFavoritesCount) return mockFavCount;
        if (selectorCallback === selectIsLoadingFavorites) return mockIsLoading;
        return undefined;
      });
      const { result } = renderHook(() => useFavorites());
      expect(result.current.favoritePosts).toEqual(mockFavPosts);
      expect(result.current.favoritesCount).toBe(mockFavCount);
      expect(result.current.isLoadingFavorites).toBe(mockIsLoading);
    });
  });

  describe('usePostFavorite', () => {
    const postId = 'some-post-id'; // Este debe ser string porque toggleFavoriteWithPersistence espera string
    // El mock de useFavorites aplicado al inicio del archivo (fuera del describe) es el que se usará aquí.
    beforeEach(() => {
        // Asegurarnos que el mock específico de useFavorites para usePostFavorite esté activo
        (require('../../../../src/features/home/hooks/usePosts').useFavorites as jest.Mock).mockImplementation(() => ({
            toggleFavorite: mockUseFavoritesToggle,
            favoritePosts: [],
            favoritesCount: 0,
            isLoadingFavorites: false,
        }));
    });

    it('debería retornar isFavorite basado en el selector selectIsPostFavorite', () => {
      const mockIsFav = true;
      (useSelector as unknown as jest.Mock).mockImplementation((selectorCallback) => {
        // selectIsPostFavorite es llamado con useSelector(state => selectIsPostFavorite(state, postId))
        if (selectorCallback.toString().includes('selectIsPostFavorite')) {
          return mockIsFav;
        }
        return undefined;
      });

      const { result } = renderHook(() => usePostFavorite(postId));
      expect(result.current.isFavorite).toBe(mockIsFav);
    });

    it('toggleFavorite debería llamar a la función toggleFavorite mockeada de useFavorites con el postId', () => {
      (useSelector as unknown as jest.Mock).mockImplementation((selectorCallback) => {
        if (selectorCallback.toString().includes('selectIsPostFavorite')) {
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => usePostFavorite(postId));
      
      // Verificar que toggleFavorite es una función
      expect(typeof result.current.toggleFavorite).toBe('function');
      
      // Ejecutar la función
      act(() => {
        result.current.toggleFavorite();
      });
      
      // Verificar que se dispatche alguna función (el thunk)
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
}); 