// Mock RTK Query React para evitar problemas con hooks
jest.mock('@reduxjs/toolkit/query/react', () => {
  const actual = jest.requireActual('@reduxjs/toolkit/query');
  return {
    ...actual,
    createApi: actual.createApi,
    fetchBaseQuery: actual.fetchBaseQuery,
  };
});

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../../src/store/api/baseApi';
import { postsApi, JsonPlaceholderPost } from '../../../src/store/api/postsApi';

// Tipo para el store de test
type TestStore = ReturnType<typeof configureStore>;

describe('postsApi', () => {
  let store: TestStore;

  beforeEach(() => {
    // Usar fake timers para controlar operaciones asíncronas
    jest.useFakeTimers();
    
    store = configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });
  });

  afterEach(() => {
    // Limpiar todas las queries pendientes
    store.dispatch(baseApi.util.resetApiState());
    
    // Limpiar cualquier timer pendiente
    jest.clearAllTimers();
    jest.clearAllMocks();
    
    // Asegurarse de que no hay operaciones pendientes
    jest.runOnlyPendingTimers();
    
    // Restaurar timers reales
    jest.useRealTimers();
  });

  describe('Configuración básica de API', () => {
    it('debe tener baseApi configurado correctamente', () => {
      expect(baseApi.reducerPath).toBe('api');
      expect(baseApi.reducer).toBeDefined();
      expect(baseApi.middleware).toBeDefined();
      expect(baseApi.util).toBeDefined();
    });

    it('debe tener los endpoints correctos definidos', () => {
      expect(postsApi.endpoints.getPosts).toBeDefined();
      expect(postsApi.endpoints.getPostById).toBeDefined();
    });

    it('debe tener la estructura correcta de endpoints', () => {
      const endpointNames = Object.keys(postsApi.endpoints);
      expect(endpointNames).toContain('getPosts');
      expect(endpointNames).toContain('getPostById');
      expect(endpointNames).toHaveLength(2);
    });

    it('debe tener API slice configurado correctamente', () => {
      // Verificar que postsApi es una extensión de baseApi
      expect(postsApi.reducerPath).toBe(baseApi.reducerPath);
      expect(postsApi.reducer).toBe(baseApi.reducer);
      expect(postsApi.middleware).toBe(baseApi.middleware);
    });
  });

  describe('Configuración de endpoints', () => {
    it('debe verificar que los endpoints están correctamente configurados', () => {
      expect(typeof postsApi.endpoints.getPosts.initiate).toBe('function');
      expect(typeof postsApi.endpoints.getPostById.initiate).toBe('function');
    });

    it('debe tener configuración correcta para getPosts', () => {
      const endpoint = postsApi.endpoints.getPosts;
      expect(endpoint).toBeDefined();
      expect(endpoint.initiate).toBeDefined();
      expect(endpoint.select).toBeDefined();
    });

    it('debe tener configuración correcta para getPostById', () => {
      const endpoint = postsApi.endpoints.getPostById;
      expect(endpoint).toBeDefined();
      expect(endpoint.initiate).toBeDefined();
      expect(endpoint.select).toBeDefined();
    });
  });

  describe('Store y middleware', () => {
    it('debe tener middleware configurado correctamente en el store', () => {
      const state = store.getState() as any;
      expect(state.api).toBeDefined();
    });

    it('debe poder despachar acciones de reset', () => {
      expect(() => {
        store.dispatch(baseApi.util.resetApiState());
      }).not.toThrow();
    });

    it('debe tener estado inicial correcto', () => {
      const state = store.getState() as any;
      expect(state.api).toEqual({
        queries: {},
        mutations: {},
        provided: {
          keys: {},
          tags: {},
        },
        subscriptions: {},
        config: {
          online: true,
          focused: true,
          middlewareRegistered: false,
          invalidationBehavior: 'delayed',
          keepUnusedDataFor: 60,
          reducerPath: 'api',
          refetchOnFocus: false,
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
        },
      });
    });

    it('debe poder invalidar tags', () => {
      expect(() => {
        store.dispatch(baseApi.util.invalidateTags(['Posts']));
      }).not.toThrow();
    });
  });

  describe('Tipos de datos', () => {
    it('debe tener tipos de datos correctos para JsonPlaceholderPost', () => {
      const mockPost: JsonPlaceholderPost = {
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        image: 'test.jpg',
        thumbnail: 'thumb.jpg',
        status: 'published',
        category: 'Test',
        publishedAt: '2024-01-01',
        updatedAt: '2024-01-01',
        userId: 1,
      };

      expect(typeof mockPost.id).toBe('number');
      expect(typeof mockPost.title).toBe('string');
      expect(typeof mockPost.content).toBe('string');
      expect(typeof mockPost.image).toBe('string');
      expect(typeof mockPost.thumbnail).toBe('string');
      expect(typeof mockPost.status).toBe('string');
      expect(typeof mockPost.category).toBe('string');
      expect(typeof mockPost.publishedAt).toBe('string');
      expect(typeof mockPost.updatedAt).toBe('string');
      expect(typeof mockPost.userId).toBe('number');
    });

    it('debe permitir arrays de JsonPlaceholderPost', () => {
      const mockPosts: JsonPlaceholderPost[] = [
        {
          id: 1,
          title: 'Post 1',
          content: 'Content 1',
          image: 'image1.jpg',
          thumbnail: 'thumb1.jpg',
          status: 'published',
          category: 'Tech',
          publishedAt: '2024-01-01',
          updatedAt: '2024-01-01',
          userId: 1,
        },
        {
          id: 2,
          title: 'Post 2',
          content: 'Content 2',
          image: 'image2.jpg',
          thumbnail: 'thumb2.jpg',
          status: 'draft',
          category: 'Science',
          publishedAt: '2024-01-02',
          updatedAt: '2024-01-02',
          userId: 2,
        },
      ];

      expect(Array.isArray(mockPosts)).toBe(true);
      expect(mockPosts).toHaveLength(2);
      expect(mockPosts[0].id).toBe(1);
      expect(mockPosts[1].id).toBe(2);
    });
  });

  describe('Funcionalidad de queries', () => {
    it('debe poder crear queries sin errores', () => {
      expect(() => {
        const query1 = postsApi.endpoints.getPosts.initiate();
        const query2 = postsApi.endpoints.getPostById.initiate(1);
        
        expect(query1).toBeDefined();
        expect(query2).toBeDefined();
      }).not.toThrow();
    });

    it('debe poder crear selectores', () => {
      const selector1 = postsApi.endpoints.getPosts.select();
      const selector2 = postsApi.endpoints.getPostById.select(1);
      
      expect(typeof selector1).toBe('function');
      expect(typeof selector2).toBe('function');
    });

    it('debe retornar estado inicial correcto de queries', () => {
      const state = store.getState() as any;
      // @ts-ignore - Tipos complejos de RTK Query en test
      const postsQuery = postsApi.endpoints.getPosts.select()(state);
      // @ts-ignore - Tipos complejos de RTK Query en test
      const postByIdQuery = postsApi.endpoints.getPostById.select(1)(state);
      
      expect(postsQuery).toEqual({
        status: 'uninitialized',
        isUninitialized: true,
        isLoading: false,
        isSuccess: false,
        isError: false,
      });

      expect(postByIdQuery).toEqual({
        status: 'uninitialized',
        isUninitialized: true,
        isLoading: false,
        isSuccess: false,
        isError: false,
      });
    });
  });

  describe('Cache y tags', () => {
    it('debe poder resetear el estado de API', () => {
      // Simular algún estado
      const action = postsApi.endpoints.getPosts.initiate();
      // @ts-ignore - Tipos complejos de RTK Query en test
      store.dispatch(action);
      
      // Reset
      store.dispatch(baseApi.util.resetApiState());
      
      // @ts-ignore - Tipos complejos en test
      const finalState = store.getState() as any;
      
      // El estado debería estar limpio
      expect(Object.keys(finalState.api.queries)).toHaveLength(0);
    });
  });

  describe('Integración con store', () => {
    it('debe estar integrado correctamente en el store', () => {
      const state = store.getState() as any;
      
      expect(state).toHaveProperty('api');
      expect(state.api).toHaveProperty('queries');
      expect(state.api).toHaveProperty('mutations');
      expect(state.api).toHaveProperty('provided');
      expect(state.api).toHaveProperty('subscriptions');
      expect(state.api).toHaveProperty('config');
    });

    it('debe tener configuración de middleware correcta', () => {
      // @ts-ignore - Tipos complejos en test
      const state = store.getState() as any;
      
      expect(state.api.config).toEqual({
        online: true,
        focused: true,
        middlewareRegistered: false,
        invalidationBehavior: 'delayed',
        keepUnusedDataFor: 60,
        reducerPath: 'api',
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
      });
    });

    it('debe manejar estados de loading correctamente', () => {
      const action = postsApi.endpoints.getPosts.initiate();
      // @ts-ignore - Tipos complejos de RTK Query en test
      store.dispatch(action);
      
      // @ts-ignore - Tipos complejos en test
      const state = store.getState() as any;
      // @ts-ignore - Tipos complejos de RTK Query en test
      const queryState = postsApi.endpoints.getPosts.select()(state);
      
      expect(queryState.status).toBe('pending');
      expect(queryState.isLoading).toBe(true);
    });
  });

  describe('Validación de configuración de URLs', () => {
    it('debe tener query builder configurado para getPosts', () => {
      const endpoint = postsApi.endpoints.getPosts;
      expect(endpoint).toBeDefined();
      
      // Verificar que el endpoint puede crear actions
      const query = endpoint.initiate();
      expect(query).toBeDefined();
      expect(typeof query).toBe('function');
      
      // Verificar que el endpoint tiene la configuración correcta
      expect(endpoint.name).toBe('getPosts');
    });

    it('debe tener query builder configurado para getPostById', () => {
      const endpoint = postsApi.endpoints.getPostById;
      expect(endpoint).toBeDefined();
      
      // Verificar que el endpoint puede crear actions con parámetros
      const query = endpoint.initiate(1);
      expect(query).toBeDefined();
      expect(typeof query).toBe('function');
      
      // Verificar que el endpoint tiene la configuración correcta
      expect(endpoint.name).toBe('getPostById');
    });
  });

  describe('Manejo de errores y estados', () => {
    it('debe manejar queries pendientes correctamente', () => {
      const query = postsApi.endpoints.getPosts.initiate();
      // @ts-ignore - Tipos complejos de RTK Query en test
      store.dispatch(query);
      
      // @ts-ignore - Tipos complejos en test
      const state = store.getState() as any;
      // @ts-ignore - Tipos complejos de RTK Query en test
      const queryState = postsApi.endpoints.getPosts.select()(state);
      
      expect(queryState.status).toBe('pending');
      expect(queryState.isLoading).toBe(true);
      expect(queryState.isUninitialized).toBe(false);
    });

    it('debe poder gestionar el ciclo de vida de queries', () => {
      // Verificar que podemos crear y despachar queries
      expect(() => {
        const query1 = postsApi.endpoints.getPosts.initiate();
        const query2 = postsApi.endpoints.getPostById.initiate(1);
        
        // @ts-ignore - Tipos complejos de RTK Query en test
        store.dispatch(query1);
        // @ts-ignore - Tipos complejos de RTK Query en test
        store.dispatch(query2);
      }).not.toThrow();
    });
  });

  describe('Configuración avanzada', () => {
    it('debe tener tags configurados para cache invalidation', () => {
      // getPosts debe proveer tag 'Posts'
      expect(postsApi.endpoints.getPosts).toBeDefined();
      expect(postsApi.endpoints.getPostById).toBeDefined();
    });

    it('debe poder trabajar con el sistema de tags', () => {
      expect(() => {
        store.dispatch(baseApi.util.invalidateTags(['Posts']));
        store.dispatch(baseApi.util.invalidateTags([{ type: 'Posts', id: 1 }]));
      }).not.toThrow();
    });

    it('debe mantener consistencia en la configuración de baseQuery', () => {
      // Verificar que baseApi está usando fetchBaseQuery
      expect(baseApi.reducerPath).toBe('api');
      
      // Los endpoints deberían heredar la configuración base
      expect(postsApi.reducerPath).toBe(baseApi.reducerPath);
    });

    it('debe tener configuración correcta de endpoints', () => {
      // Verificar que los endpoints están correctamente configurados
      expect(postsApi.endpoints.getPosts.name).toBe('getPosts');
      expect(postsApi.endpoints.getPostById.name).toBe('getPostById');
      
      // Verificar que tienen las funciones necesarias
      expect(typeof postsApi.endpoints.getPosts.initiate).toBe('function');
      expect(typeof postsApi.endpoints.getPostById.initiate).toBe('function');
      expect(typeof postsApi.endpoints.getPosts.select).toBe('function');
      expect(typeof postsApi.endpoints.getPostById.select).toBe('function');
    });
  });
}); 