import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsReducer, {
  setPosts,
  setSearchQuery,
  setFavoriteIds,
  toggleFavorite,
  setLoadingFavorites,
  clearSearch,
  loadFavorites,
  saveFavorites,
  toggleFavoriteWithPersistence,
  PostsState,
} from '../../../src/store/slices/postsSlice';
import { JsonPlaceholderPost } from '../../../src/store/api/postsApi';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

// Tipo para el store de test
type TestStore = {
  posts: PostsState;
};

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

const initialState: PostsState = {
  posts: [],
  favoriteIds: [],
  searchQuery: '',
  filteredPosts: [],
  isLoadingFavorites: false,
};

describe('postsSlice', () => {
  let store: ReturnType<typeof configureStore<TestStore>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const state = store.getState().posts;
      expect(state).toEqual(initialState);
    });
  });

  describe('Reducers síncronos', () => {
    describe('setPosts', () => {
      it('debe establecer posts y filteredPosts cuando no hay query de búsqueda', () => {
        store.dispatch(setPosts(mockPosts));
        const state = store.getState().posts;

        expect(state.posts).toEqual(mockPosts);
        expect(state.filteredPosts).toEqual(mockPosts);
      });

      it('debe establecer posts y filtrar correctamente cuando hay query de búsqueda', () => {
        // Primero establecer query de búsqueda
        store.dispatch(setSearchQuery('React'));
        // Luego establecer posts
        store.dispatch(setPosts(mockPosts));
        
        const state = store.getState().posts;
        expect(state.posts).toEqual(mockPosts);
        expect(state.filteredPosts).toHaveLength(1);
        expect(state.filteredPosts[0].title).toBe('React Native Testing');
      });

      it('debe manejar array vacío de posts', () => {
        store.dispatch(setPosts([]));
        const state = store.getState().posts;

        expect(state.posts).toEqual([]);
        expect(state.filteredPosts).toEqual([]);
      });
    });

    describe('setSearchQuery', () => {
      beforeEach(() => {
        store.dispatch(setPosts(mockPosts));
      });

      it('debe filtrar posts por título', () => {
        store.dispatch(setSearchQuery('React'));
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('React');
        expect(state.filteredPosts).toHaveLength(1);
        expect(state.filteredPosts[0].title).toBe('React Native Testing');
      });

      it('debe filtrar posts por contenido', () => {
        store.dispatch(setSearchQuery('JavaScript concepts'));
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('JavaScript concepts');
        expect(state.filteredPosts).toHaveLength(1);
        expect(state.filteredPosts[0].title).toBe('JavaScript Fundamentals');
      });

      it('debe ser case-insensitive', () => {
        store.dispatch(setSearchQuery('MOBILE APP'));
        const state = store.getState().posts;

        expect(state.filteredPosts).toHaveLength(1);
        expect(state.filteredPosts[0].title).toBe('Mobile App Design');
      });

      it('debe manejar búsquedas sin resultados', () => {
        store.dispatch(setSearchQuery('NoExiste'));
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('NoExiste');
        expect(state.filteredPosts).toHaveLength(0);
      });

      it('debe ignorar espacios en blanco al buscar', () => {
        store.dispatch(setSearchQuery('  React  '));
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('  React  ');
        expect(state.filteredPosts).toHaveLength(1);
      });

      it('debe mostrar todos los posts cuando query está vacío', () => {
        store.dispatch(setSearchQuery('React'));
        store.dispatch(setSearchQuery(''));
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('');
        expect(state.filteredPosts).toHaveLength(3);
      });
    });

    describe('setFavoriteIds', () => {
      it('debe establecer favoriteIds correctamente', () => {
        const favoriteIds = ['1', '3'];
        store.dispatch(setFavoriteIds(favoriteIds));
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual(favoriteIds);
      });

      it('debe manejar array vacío', () => {
        store.dispatch(setFavoriteIds([]));
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual([]);
      });

      it('debe reemplazar favoriteIds anteriores', () => {
        store.dispatch(setFavoriteIds(['1', '2']));
        store.dispatch(setFavoriteIds(['3']));
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual(['3']);
      });
    });

    describe('toggleFavorite', () => {
      it('debe agregar post a favoritos cuando no está marcado', () => {
        store.dispatch(toggleFavorite('1'));
        const state = store.getState().posts;

        expect(state.favoriteIds).toContain('1');
        expect(state.favoriteIds).toHaveLength(1);
      });

      it('debe quitar post de favoritos cuando ya está marcado', () => {
        store.dispatch(setFavoriteIds(['1', '2', '3']));
        store.dispatch(toggleFavorite('2'));
        const state = store.getState().posts;

        expect(state.favoriteIds).not.toContain('2');
        expect(state.favoriteIds).toEqual(['1', '3']);
      });

      it('debe manejar toggle múltiple del mismo post', () => {
        // Agregar
        store.dispatch(toggleFavorite('1'));
        expect(store.getState().posts.favoriteIds).toContain('1');

        // Quitar
        store.dispatch(toggleFavorite('1'));
        expect(store.getState().posts.favoriteIds).not.toContain('1');

        // Agregar de nuevo
        store.dispatch(toggleFavorite('1'));
        expect(store.getState().posts.favoriteIds).toContain('1');
      });
    });

    describe('setLoadingFavorites', () => {
      it('debe establecer isLoadingFavorites en true', () => {
        store.dispatch(setLoadingFavorites(true));
        const state = store.getState().posts;

        expect(state.isLoadingFavorites).toBe(true);
      });

      it('debe establecer isLoadingFavorites en false', () => {
        store.dispatch(setLoadingFavorites(true));
        store.dispatch(setLoadingFavorites(false));
        const state = store.getState().posts;

        expect(state.isLoadingFavorites).toBe(false);
      });
    });

    describe('clearSearch', () => {
      beforeEach(() => {
        store.dispatch(setPosts(mockPosts));
        store.dispatch(setSearchQuery('React'));
      });

      it('debe limpiar searchQuery y restablecer filteredPosts', () => {
        store.dispatch(clearSearch());
        const state = store.getState().posts;

        expect(state.searchQuery).toBe('');
        expect(state.filteredPosts).toEqual(mockPosts);
      });
    });
  });

  describe('Thunks asíncronos', () => {
    describe('loadFavorites', () => {
      it('debe cargar favoritos desde AsyncStorage exitosamente', async () => {
        const mockFavorites = ['1', '3'];
        mockAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

        await store.dispatch(loadFavorites() as any);
        const state = store.getState().posts;

        expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@favorites_posts');
        expect(state.favoriteIds).toEqual(mockFavorites);
        expect(state.isLoadingFavorites).toBe(false);
      });

      it('debe manejar AsyncStorage vacío', async () => {
        mockAsyncStorage.getItem.mockResolvedValueOnce(null);

        await store.dispatch(loadFavorites() as any);
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual([]);
        expect(state.isLoadingFavorites).toBe(false);
      });

      it('debe manejar errores de AsyncStorage', async () => {
        mockAsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));

        await store.dispatch(loadFavorites() as any);
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual([]);
        expect(state.isLoadingFavorites).toBe(false);
      });

      it('no debe cargar si ya está cargando favoritos', async () => {
        store.dispatch(setLoadingFavorites(true));
        
        await store.dispatch(loadFavorites() as any);

        expect(mockAsyncStorage.getItem).not.toHaveBeenCalled();
      });

      it('no debe cargar si ya tiene favoritos', async () => {
        store.dispatch(setFavoriteIds(['1', '2']));
        
        await store.dispatch(loadFavorites() as any);

        expect(mockAsyncStorage.getItem).not.toHaveBeenCalled();
      });

      it('debe establecer loading state durante la carga', async () => {
        let resolvePromise: (value: string) => void;
        const promise = new Promise<string>((resolve) => {
          resolvePromise = resolve;
        });
        
        mockAsyncStorage.getItem.mockReturnValue(promise);

        const loadPromise = store.dispatch(loadFavorites() as any);
        
        // Verificar que está en loading
        expect(store.getState().posts.isLoadingFavorites).toBe(true);

        // Resolver la promesa
        resolvePromise!('["1","2"]');
        await loadPromise;

        // Verificar que terminó loading
        expect(store.getState().posts.isLoadingFavorites).toBe(false);
      });
    });

    describe('saveFavorites', () => {
      it('debe guardar favoritos en AsyncStorage exitosamente', async () => {
        const favoriteIds = ['1', '3'];
        mockAsyncStorage.setItem.mockResolvedValueOnce();

        await store.dispatch(saveFavorites(favoriteIds) as any);

        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
          '@favorites_posts',
          JSON.stringify(favoriteIds)
        );
      });

      it('debe manejar errores de AsyncStorage silenciosamente', async () => {
        const favoriteIds = ['1', '3'];
        mockAsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage error'));

        // No debe lanzar error
        await expect(store.dispatch(saveFavorites(favoriteIds) as any)).resolves.toBeUndefined();
      });
    });

    describe('toggleFavoriteWithPersistence', () => {
      it('debe toggle favorito y persistir cambios', async () => {
        mockAsyncStorage.setItem.mockResolvedValueOnce();

        await store.dispatch(toggleFavoriteWithPersistence('1') as any);
        const state = store.getState().posts;

        expect(state.favoriteIds).toContain('1');
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
          '@favorites_posts',
          JSON.stringify(['1'])
        );
      });

      it('debe quitar favorito y persistir cambios', async () => {
        store.dispatch(setFavoriteIds(['1', '2']));
        mockAsyncStorage.setItem.mockResolvedValueOnce();

        await store.dispatch(toggleFavoriteWithPersistence('1') as any);
        const state = store.getState().posts;

        expect(state.favoriteIds).toEqual(['2']);
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
          '@favorites_posts',
          JSON.stringify(['2'])
        );
      });

      it('debe manejar errores de persistencia', async () => {
        mockAsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage error'));

        // No debe lanzar error y debe actualizar estado
        await expect(store.dispatch(toggleFavoriteWithPersistence('1') as any)).resolves.toBeUndefined();
        
        const state = store.getState().posts;
        expect(state.favoriteIds).toContain('1');
      });
    });
  });

  describe('Integración y casos complejos', () => {
    it('debe mantener filtro al agregar favoritos', () => {
      store.dispatch(setPosts(mockPosts));
      store.dispatch(setSearchQuery('React'));
      store.dispatch(toggleFavorite('1'));
      
      const state = store.getState().posts;
      expect(state.favoriteIds).toContain('1');
      expect(state.filteredPosts).toHaveLength(1);
      expect(state.searchQuery).toBe('React');
    });

    it('debe manejar múltiples operaciones en secuencia', () => {
      store.dispatch(setPosts(mockPosts));
      store.dispatch(setSearchQuery('JavaScript'));
      store.dispatch(toggleFavorite('2'));
      store.dispatch(setSearchQuery(''));
      store.dispatch(toggleFavorite('1'));
      
      const state = store.getState().posts;
      expect(state.favoriteIds).toEqual(['2', '1']);
      expect(state.filteredPosts).toEqual(mockPosts);
      expect(state.searchQuery).toBe('');
    });

    it('debe manejar búsquedas con caracteres especiales', () => {
      const specialPost: JsonPlaceholderPost = {
        ...mockPosts[0],
        title: 'Special chars: ñáéíóú & @#$%',
        content: 'Testing special characters',
      };
      
      store.dispatch(setPosts([specialPost]));
      store.dispatch(setSearchQuery('ñáéíóú'));
      
      const state = store.getState().posts;
      expect(state.filteredPosts).toHaveLength(1);
    });
  });
}); 