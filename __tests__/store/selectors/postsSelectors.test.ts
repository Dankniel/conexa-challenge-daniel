import {
  selectPostsState,
  selectPosts,
  selectFilteredPosts,
  selectFavoriteIds,
  selectSearchQuery,
  selectIsLoadingFavorites,
  selectFavoritePosts,
  selectIsPostFavorite,
  selectFavoritesCount,
  selectHasSearchQuery,
  selectPostsToDisplay,
} from '../../../src/store/selectors/postsSelectors';
import { RootState } from '../../../src/store/store';
import { JsonPlaceholderPost } from '../../../src/store/api/postsApi';

// Mock posts data para testing
const mockPosts: JsonPlaceholderPost[] = [
  {
    id: 1,
    title: 'React Native Testing',
    content: 'Learn how to test React Native apps with Jest',
    image: 'image1.jpg',
    thumbnail: 'thumb1.jpg',
    status: 'published',
    category: 'Technology',
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    userId: 1,
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    content: 'Understanding core JavaScript concepts for better development',
    image: 'image2.jpg',
    thumbnail: 'thumb2.jpg',
    status: 'published',
    category: 'Programming',
    publishedAt: '2024-01-02',
    updatedAt: '2024-01-02',
    userId: 2,
  },
  {
    id: 3,
    title: 'Mobile App Design',
    content: 'Best practices for designing mobile applications',
    image: 'image3.jpg',
    thumbnail: 'thumb3.jpg',
    status: 'published',
    category: 'Design',
    publishedAt: '2024-01-03',
    updatedAt: '2024-01-03',
    userId: 1,
  },
];

// Helper para crear estados de prueba
const createMockRootState = (overrides: any = {}): RootState => ({
  posts: {
    posts: [],
    favoriteIds: [],
    searchQuery: '',
    filteredPosts: [],
    isLoadingFavorites: false,
    ...overrides.posts,
  },
  auth: {
    userToken: null,
    isLoading: false,
    selectedLanguage: 'es',
    ...overrides.auth,
  },
  users: {
    users: [],
    isLoading: false,
    error: null,
    ...overrides.users,
  },
  api: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      online: true,
      focused: true,
      middlewareRegistered: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: 'api',
    },
    ...overrides.api,
  },
  ...overrides,
} as RootState);

describe('postsSelectors', () => {
  describe('Selectores básicos', () => {
    describe('selectPostsState', () => {
      it('debe retornar el estado completo de posts', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: ['1', '2'],
            searchQuery: 'test',
            filteredPosts: [mockPosts[0]],
            isLoadingFavorites: true,
          },
        });

        const result = selectPostsState(state);

        expect(result).toEqual({
          posts: mockPosts,
          favoriteIds: ['1', '2'],
          searchQuery: 'test',
          filteredPosts: [mockPosts[0]],
          isLoadingFavorites: true,
        });
      });
    });

    describe('selectPosts', () => {
      it('debe retornar array vacío cuando no hay posts', () => {
        const state = createMockRootState();
        const result = selectPosts(state);
        expect(result).toEqual([]);
      });

      it('debe retornar todos los posts cuando existen', () => {
        const state = createMockRootState({
          posts: { posts: mockPosts },
        });
        const result = selectPosts(state);
        expect(result).toEqual(mockPosts);
      });
    });

    describe('selectFilteredPosts', () => {
      it('debe retornar posts filtrados correctamente', () => {
        const filteredPosts = [mockPosts[0]];
        const state = createMockRootState({
          posts: { filteredPosts },
        });
        const result = selectFilteredPosts(state);
        expect(result).toEqual(filteredPosts);
      });
    });

    describe('selectFavoriteIds', () => {
      it('debe retornar array vacío cuando no hay favoritos', () => {
        const state = createMockRootState();
        const result = selectFavoriteIds(state);
        expect(result).toEqual([]);
      });

      it('debe retornar los IDs de favoritos correctamente', () => {
        const favoriteIds = ['1', '3'];
        const state = createMockRootState({
          posts: { favoriteIds },
        });
        const result = selectFavoriteIds(state);
        expect(result).toEqual(favoriteIds);
      });
    });

    describe('selectSearchQuery', () => {
      it('debe retornar string vacío cuando no hay query', () => {
        const state = createMockRootState();
        const result = selectSearchQuery(state);
        expect(result).toBe('');
      });

      it('debe retornar la query de búsqueda correcta', () => {
        const searchQuery = 'React Native';
        const state = createMockRootState({
          posts: { searchQuery },
        });
        const result = selectSearchQuery(state);
        expect(result).toBe(searchQuery);
      });
    });

    describe('selectIsLoadingFavorites', () => {
      it('debe retornar false por defecto', () => {
        const state = createMockRootState();
        const result = selectIsLoadingFavorites(state);
        expect(result).toBe(false);
      });

      it('debe retornar true cuando está cargando favoritos', () => {
        const state = createMockRootState({
          posts: { isLoadingFavorites: true },
        });
        const result = selectIsLoadingFavorites(state);
        expect(result).toBe(true);
      });
    });
  });

  describe('Selectores memoizados', () => {
    describe('selectFavoritePosts', () => {
      it('debe retornar array vacío cuando no hay posts', () => {
        const state = createMockRootState({
          posts: {
            posts: [],
            favoriteIds: ['1', '2'],
          },
        });
        const result = selectFavoritePosts(state);
        expect(result).toEqual([]);
      });

      it('debe retornar array vacío cuando no hay favoritos', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: [],
          },
        });
        const result = selectFavoritePosts(state);
        expect(result).toEqual([]);
      });

      it('debe retornar posts favoritos correctamente', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: ['1', '3'],
          },
        });
        const result = selectFavoritePosts(state);
        
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(3);
      });

      it('debe filtrar correctamente posts que no existen en favoritos', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: ['1', '999'], // 999 no existe
          },
        });
        const result = selectFavoritePosts(state);
        
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
      });

      it('debe manejar favoriteIds con strings de números', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: ['2'], // String
          },
        });
        const result = selectFavoritePosts(state);
        
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(2);
      });

      it('debe ser memoizado - retornar la misma referencia para inputs iguales', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            favoriteIds: ['1', '2'],
          },
        });
        
        const result1 = selectFavoritePosts(state);
        const result2 = selectFavoritePosts(state);
        
        expect(result1).toBe(result2); // Misma referencia
      });
    });

    describe('selectIsPostFavorite', () => {
      it('debe retornar false cuando el post no es favorito', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: ['2', '3'],
          },
        });
        const result = selectIsPostFavorite(state, '1');
        expect(result).toBe(false);
      });

      it('debe retornar true cuando el post es favorito', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: ['1', '2', '3'],
          },
        });
        const result = selectIsPostFavorite(state, '2');
        expect(result).toBe(true);
      });

      it('debe manejar array vacío de favoritos', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: [],
          },
        });
        const result = selectIsPostFavorite(state, '1');
        expect(result).toBe(false);
      });

      it('debe ser case-sensitive con IDs', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: ['1'],
          },
        });
        
        expect(selectIsPostFavorite(state, '1')).toBe(true);
        expect(selectIsPostFavorite(state, '01')).toBe(false);
      });
    });

    describe('selectFavoritesCount', () => {
      it('debe retornar 0 cuando no hay favoritos', () => {
        const state = createMockRootState();
        const result = selectFavoritesCount(state);
        expect(result).toBe(0);
      });

      it('debe retornar el número correcto de favoritos', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: ['1', '2', '3', '4', '5'],
          },
        });
        const result = selectFavoritesCount(state);
        expect(result).toBe(5);
      });

      it('debe ser memoizado', () => {
        const state = createMockRootState({
          posts: {
            favoriteIds: ['1', '2'],
          },
        });
        
        const result1 = selectFavoritesCount(state);
        const result2 = selectFavoritesCount(state);
        
        expect(result1).toBe(result2);
        expect(result1).toBe(2);
      });
    });

    describe('selectHasSearchQuery', () => {
      it('debe retornar false para string vacío', () => {
        const state = createMockRootState({
          posts: { searchQuery: '' },
        });
        const result = selectHasSearchQuery(state);
        expect(result).toBe(false);
      });

      it('debe retornar false para string solo con espacios', () => {
        const state = createMockRootState({
          posts: { searchQuery: '   ' },
        });
        const result = selectHasSearchQuery(state);
        expect(result).toBe(false);
      });

      it('debe retornar true para query válida', () => {
        const state = createMockRootState({
          posts: { searchQuery: 'React' },
        });
        const result = selectHasSearchQuery(state);
        expect(result).toBe(true);
      });

      it('debe retornar true para query con espacios pero contenido', () => {
        const state = createMockRootState({
          posts: { searchQuery: '  React  ' },
        });
        const result = selectHasSearchQuery(state);
        expect(result).toBe(true);
      });
    });

    describe('selectPostsToDisplay', () => {
      it('debe retornar todos los posts cuando no hay búsqueda', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            filteredPosts: [mockPosts[0]], // Diferente para probar que usa posts, no filtered
            searchQuery: '',
          },
        });
        const result = selectPostsToDisplay(state);
        expect(result).toEqual(mockPosts);
      });

      it('debe retornar posts filtrados cuando hay búsqueda', () => {
        const filteredPosts = [mockPosts[0]];
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            filteredPosts,
            searchQuery: 'React',
          },
        });
        const result = selectPostsToDisplay(state);
        expect(result).toEqual(filteredPosts);
      });

      it('debe retornar posts filtrados para búsqueda con espacios', () => {
        const filteredPosts = [mockPosts[1]];
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            filteredPosts,
            searchQuery: '  JavaScript  ',
          },
        });
        const result = selectPostsToDisplay(state);
        expect(result).toEqual(filteredPosts);
      });

      it('debe retornar todos los posts para búsqueda vacía', () => {
        const state = createMockRootState({
          posts: {
            posts: mockPosts,
            filteredPosts: [], // Debería ignorar esto
            searchQuery: '   ', // Solo espacios
          },
        });
        const result = selectPostsToDisplay(state);
        expect(result).toEqual(mockPosts);
      });
    });
  });

  describe('Integración y casos complejos', () => {
    it('debe manejar estado complejo con búsqueda y favoritos', () => {
      const state = createMockRootState({
        posts: {
          posts: mockPosts,
          favoriteIds: ['1', '3'],
          searchQuery: 'React',
          filteredPosts: [mockPosts[0]], // Solo React post
          isLoadingFavorites: false,
        },
      });

      expect(selectPostsToDisplay(state)).toEqual([mockPosts[0]]);
      expect(selectFavoritePosts(state)).toHaveLength(2);
      expect(selectIsPostFavorite(state, '1')).toBe(true);
      expect(selectIsPostFavorite(state, '2')).toBe(false);
      expect(selectFavoritesCount(state)).toBe(2);
      expect(selectHasSearchQuery(state)).toBe(true);
    });

    it('debe manejar cambios de estado y memoización', () => {
      const baseState = createMockRootState({
        posts: {
          posts: mockPosts,
          favoriteIds: ['1'],
        },
      });

      // Primera llamada
      const favorites1 = selectFavoritePosts(baseState);
      const count1 = selectFavoritesCount(baseState);

      // Estado modificado - agregar favorito
      const newState = createMockRootState({
        posts: {
          posts: mockPosts,
          favoriteIds: ['1', '2'],
        },
      });

      const favorites2 = selectFavoritePosts(newState);
      const count2 = selectFavoritesCount(newState);

      // Verificar que los valores cambiaron
      expect(favorites1).toHaveLength(1);
      expect(favorites2).toHaveLength(2);
      expect(count1).toBe(1);
      expect(count2).toBe(2);

      // Verificar que las referencias cambiaron (nueva memoización)
      expect(favorites1).not.toBe(favorites2);
    });

    it('debe manejar casos edge con datos vacíos', () => {
      const emptyState = createMockRootState();

      expect(selectPosts(emptyState)).toEqual([]);
      expect(selectFavoritePosts(emptyState)).toEqual([]);
      expect(selectFavoritesCount(emptyState)).toBe(0);
      expect(selectPostsToDisplay(emptyState)).toEqual([]);
      expect(selectHasSearchQuery(emptyState)).toBe(false);
      expect(selectIsPostFavorite(emptyState, '1')).toBe(false);
    });
  });
}); 