import { configureStore } from '@reduxjs/toolkit';
import usersReducer, {
  setSelectedUser,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  setIsRefreshing,
  resetFilters,
} from '../../../src/store/slices/usersSlice';
import { User } from '../../../src/types/user';

// Mock user data para testing
const mockUsers: User[] = [
  {
    id: 1,
    firstname: 'Juan',
    lastname: 'Pérez',
    email: 'juan.perez@email.com',
    birthDate: '1990-01-15',
    login: {
      uuid: 'uuid-1',
      username: 'juanperez',
      password: 'password123',
      md5: 'md5hash1',
      sha1: 'sha1hash1',
      registered: '2020-01-01',
    },
    address: {
      street: 'Calle Principal 123',
      suite: 'Apt. 4B',
      city: 'Buenos Aires',
      zipcode: '1000',
      geo: {
        lat: '-34.6037',
        lng: '-58.3816',
      },
    },
    phone: '+54 11 1234-5678',
    website: 'juan-perez.com',
    company: {
      name: 'Tech Solutions',
      catchPhrase: 'Soluciones tecnológicas innovadoras',
      bs: 'desarrollo de software',
    },
  },
  {
    id: 2,
    firstname: 'María',
    lastname: 'González',
    email: 'maria.gonzalez@email.com',
    birthDate: '1985-03-22',
    login: {
      uuid: 'uuid-2',
      username: 'mariagonzalez',
      password: 'password456',
      md5: 'md5hash2',
      sha1: 'sha1hash2',
      registered: '2019-05-15',
    },
    address: {
      street: 'Av. Libertador 456',
      suite: 'Piso 10',
      city: 'Buenos Aires',
      zipcode: '1425',
      geo: {
        lat: '-34.5900',
        lng: '-58.3930',
      },
    },
    phone: '+54 11 9876-5432',
    website: 'maria-gonzalez.com',
    company: {
      name: 'Design Studio',
      catchPhrase: 'Creatividad sin límites',
      bs: 'diseño gráfico',
    },
  },
];

// Configuración del store para tests
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
    preloadedState: initialState,
  });
};

describe('usersSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const state = store.getState().users;
      
      expect(state.selectedUser).toBeNull();
      expect(state.filters.searchTerm).toBe('');
      expect(state.filters.sortBy).toBe('name');
      expect(state.filters.sortOrder).toBe('asc');
      expect(state.ui.isRefreshing).toBe(false);
    });
  });

  describe('Gestión de usuario seleccionado', () => {
    describe('setSelectedUser', () => {
      it('debe establecer un usuario seleccionado correctamente', () => {
        const user = mockUsers[0];
        
        store.dispatch(setSelectedUser(user));
        const state = store.getState().users;
        
        expect(state.selectedUser).toEqual(user);
        expect(state.selectedUser?.id).toBe(1);
        expect(state.selectedUser?.firstname).toBe('Juan');
        expect(state.selectedUser?.lastname).toBe('Pérez');
      });

      it('debe poder cambiar el usuario seleccionado', () => {
        const user1 = mockUsers[0];
        const user2 = mockUsers[1];
        
        // Seleccionar primer usuario
        store.dispatch(setSelectedUser(user1));
        expect(store.getState().users.selectedUser?.id).toBe(1);
        
        // Cambiar al segundo usuario
        store.dispatch(setSelectedUser(user2));
        expect(store.getState().users.selectedUser?.id).toBe(2);
        expect(store.getState().users.selectedUser?.firstname).toBe('María');
      });

      it('debe poder limpiar la selección estableciendo null', () => {
        const user = mockUsers[0];
        
        // Primero seleccionar un usuario
        store.dispatch(setSelectedUser(user));
        expect(store.getState().users.selectedUser).not.toBeNull();
        
        // Luego limpiar la selección
        store.dispatch(setSelectedUser(null));
        expect(store.getState().users.selectedUser).toBeNull();
      });

      it('debe preservar otros estados al cambiar usuario seleccionado', () => {
        const user = mockUsers[0];
        
        // Establecer algunos filtros
        store.dispatch(setSearchTerm('test'));
        store.dispatch(setSortBy('email'));
        
        // Seleccionar usuario
        store.dispatch(setSelectedUser(user));
        
        const state = store.getState().users;
        expect(state.selectedUser).toEqual(user);
        expect(state.filters.searchTerm).toBe('test');
        expect(state.filters.sortBy).toBe('email');
      });
    });
  });

  describe('Gestión de filtros', () => {
    describe('setSearchTerm', () => {
      it('debe establecer término de búsqueda correctamente', () => {
        store.dispatch(setSearchTerm('juan'));
        const state = store.getState().users;
        
        expect(state.filters.searchTerm).toBe('juan');
      });

      it('debe manejar término de búsqueda vacío', () => {
        // Primero establecer un término
        store.dispatch(setSearchTerm('test'));
        expect(store.getState().users.filters.searchTerm).toBe('test');
        
        // Luego limpiarlo
        store.dispatch(setSearchTerm(''));
        expect(store.getState().users.filters.searchTerm).toBe('');
      });

      it('debe manejar términos de búsqueda con espacios', () => {
        store.dispatch(setSearchTerm('  maría gonzález  '));
        const state = store.getState().users;
        
        expect(state.filters.searchTerm).toBe('  maría gonzález  ');
      });

      it('debe manejar caracteres especiales en búsqueda', () => {
        const specialTerm = 'test@email.com & #123';
        store.dispatch(setSearchTerm(specialTerm));
        const state = store.getState().users;
        
        expect(state.filters.searchTerm).toBe(specialTerm);
      });

      it('debe preservar otros filtros al cambiar término de búsqueda', () => {
        // Establecer otros filtros
        store.dispatch(setSortBy('company'));
        store.dispatch(setSortOrder('desc'));
        
        // Cambiar término de búsqueda
        store.dispatch(setSearchTerm('test'));
        
        const state = store.getState().users;
        expect(state.filters.searchTerm).toBe('test');
        expect(state.filters.sortBy).toBe('company');
        expect(state.filters.sortOrder).toBe('desc');
      });
    });

    describe('setSortBy', () => {
      it('debe establecer ordenamiento por nombre', () => {
        store.dispatch(setSortBy('name'));
        const state = store.getState().users;
        
        expect(state.filters.sortBy).toBe('name');
      });

      it('debe establecer ordenamiento por email', () => {
        store.dispatch(setSortBy('email'));
        const state = store.getState().users;
        
        expect(state.filters.sortBy).toBe('email');
      });

      it('debe establecer ordenamiento por compañía', () => {
        store.dispatch(setSortBy('company'));
        const state = store.getState().users;
        
        expect(state.filters.sortBy).toBe('company');
      });

      it('debe cambiar entre diferentes criterios de ordenamiento', () => {
        // Cambiar a email
        store.dispatch(setSortBy('email'));
        expect(store.getState().users.filters.sortBy).toBe('email');
        
        // Cambiar a company
        store.dispatch(setSortBy('company'));
        expect(store.getState().users.filters.sortBy).toBe('company');
        
        // Volver a name
        store.dispatch(setSortBy('name'));
        expect(store.getState().users.filters.sortBy).toBe('name');
      });

      it('debe preservar otros filtros al cambiar criterio de ordenamiento', () => {
        store.dispatch(setSearchTerm('test'));
        store.dispatch(setSortOrder('desc'));
        
        store.dispatch(setSortBy('email'));
        
        const state = store.getState().users;
        expect(state.filters.sortBy).toBe('email');
        expect(state.filters.searchTerm).toBe('test');
        expect(state.filters.sortOrder).toBe('desc');
      });
    });

    describe('setSortOrder', () => {
      it('debe establecer orden ascendente', () => {
        store.dispatch(setSortOrder('asc'));
        const state = store.getState().users;
        
        expect(state.filters.sortOrder).toBe('asc');
      });

      it('debe establecer orden descendente', () => {
        store.dispatch(setSortOrder('desc'));
        const state = store.getState().users;
        
        expect(state.filters.sortOrder).toBe('desc');
      });

      it('debe alternar entre órdenes', () => {
        // Cambiar a descendente
        store.dispatch(setSortOrder('desc'));
        expect(store.getState().users.filters.sortOrder).toBe('desc');
        
        // Volver a ascendente
        store.dispatch(setSortOrder('asc'));
        expect(store.getState().users.filters.sortOrder).toBe('asc');
      });

      it('debe preservar otros filtros al cambiar orden', () => {
        store.dispatch(setSearchTerm('test'));
        store.dispatch(setSortBy('company'));
        
        store.dispatch(setSortOrder('desc'));
        
        const state = store.getState().users;
        expect(state.filters.sortOrder).toBe('desc');
        expect(state.filters.searchTerm).toBe('test');
        expect(state.filters.sortBy).toBe('company');
      });
    });

    describe('resetFilters', () => {
      it('debe resetear todos los filtros al estado inicial', () => {
        // Establecer filtros diferentes al inicial
        store.dispatch(setSearchTerm('test search'));
        store.dispatch(setSortBy('email'));
        store.dispatch(setSortOrder('desc'));
        
        // Verificar que se establecieron
        let state = store.getState().users;
        expect(state.filters.searchTerm).toBe('test search');
        expect(state.filters.sortBy).toBe('email');
        expect(state.filters.sortOrder).toBe('desc');
        
        // Resetear filtros
        store.dispatch(resetFilters());
        
        // Verificar que volvieron al estado inicial
        state = store.getState().users;
        expect(state.filters.searchTerm).toBe('');
        expect(state.filters.sortBy).toBe('name');
        expect(state.filters.sortOrder).toBe('asc');
      });

      it('debe preservar usuario seleccionado y estado de UI al resetear filtros', () => {
        const user = mockUsers[0];
        
        // Establecer usuario y estado de UI
        store.dispatch(setSelectedUser(user));
        store.dispatch(setIsRefreshing(true));
        
        // Establecer filtros
        store.dispatch(setSearchTerm('test'));
        store.dispatch(setSortBy('email'));
        
        // Resetear solo filtros
        store.dispatch(resetFilters());
        
        const state = store.getState().users;
        expect(state.filters.searchTerm).toBe('');
        expect(state.filters.sortBy).toBe('name');
        expect(state.selectedUser).toEqual(user);
        expect(state.ui.isRefreshing).toBe(true);
      });

      it('debe funcionar correctamente cuando los filtros ya están en estado inicial', () => {
        // Los filtros ya están en estado inicial
        const initialState = store.getState().users.filters;
        
        // Resetear filtros
        store.dispatch(resetFilters());
        
        const finalState = store.getState().users.filters;
        expect(finalState).toEqual(initialState);
        expect(finalState.searchTerm).toBe('');
        expect(finalState.sortBy).toBe('name');
        expect(finalState.sortOrder).toBe('asc');
      });
    });
  });

  describe('Gestión de estado de UI', () => {
    describe('setIsRefreshing', () => {
      it('debe establecer estado de refreshing en true', () => {
        store.dispatch(setIsRefreshing(true));
        const state = store.getState().users;
        
        expect(state.ui.isRefreshing).toBe(true);
      });

      it('debe establecer estado de refreshing en false', () => {
        // Primero establecer en true
        store.dispatch(setIsRefreshing(true));
        expect(store.getState().users.ui.isRefreshing).toBe(true);
        
        // Luego cambiar a false
        store.dispatch(setIsRefreshing(false));
        expect(store.getState().users.ui.isRefreshing).toBe(false);
      });

      it('debe alternar estado de refreshing múltiples veces', () => {
        // true -> false -> true
        store.dispatch(setIsRefreshing(true));
        expect(store.getState().users.ui.isRefreshing).toBe(true);
        
        store.dispatch(setIsRefreshing(false));
        expect(store.getState().users.ui.isRefreshing).toBe(false);
        
        store.dispatch(setIsRefreshing(true));
        expect(store.getState().users.ui.isRefreshing).toBe(true);
      });

      it('debe preservar otros estados al cambiar isRefreshing', () => {
        const user = mockUsers[0];
        
        // Establecer otros estados
        store.dispatch(setSelectedUser(user));
        store.dispatch(setSearchTerm('test'));
        store.dispatch(setSortBy('email'));
        
        // Cambiar estado de refreshing
        store.dispatch(setIsRefreshing(true));
        
        const state = store.getState().users;
        expect(state.ui.isRefreshing).toBe(true);
        expect(state.selectedUser).toEqual(user);
        expect(state.filters.searchTerm).toBe('test');
        expect(state.filters.sortBy).toBe('email');
      });
    });
  });

  describe('Casos complejos e integración', () => {
    it('debe manejar múltiples acciones en secuencia', () => {
      const user = mockUsers[1];
      
      // Secuencia de acciones
      store.dispatch(setSelectedUser(user));
      store.dispatch(setSearchTerm('maría'));
      store.dispatch(setSortBy('company'));
      store.dispatch(setSortOrder('desc'));
      store.dispatch(setIsRefreshing(true));
      
      const state = store.getState().users;
      expect(state.selectedUser).toEqual(user);
      expect(state.filters.searchTerm).toBe('maría');
      expect(state.filters.sortBy).toBe('company');
      expect(state.filters.sortOrder).toBe('desc');
      expect(state.ui.isRefreshing).toBe(true);
    });

    it('debe manejar cambios de usuario mientras hay filtros activos', () => {
      const user1 = mockUsers[0];
      const user2 = mockUsers[1];
      
      // Establecer filtros y primer usuario
      store.dispatch(setSearchTerm('test'));
      store.dispatch(setSortBy('email'));
      store.dispatch(setSelectedUser(user1));
      
      // Cambiar usuario manteniendo filtros
      store.dispatch(setSelectedUser(user2));
      
      const state = store.getState().users;
      expect(state.selectedUser).toEqual(user2);
      expect(state.filters.searchTerm).toBe('test');
      expect(state.filters.sortBy).toBe('email');
    });

    it('debe manejar reset de filtros con usuario seleccionado', () => {
      const user = mockUsers[0];
      
      // Establecer todo
      store.dispatch(setSelectedUser(user));
      store.dispatch(setSearchTerm('búsqueda compleja'));
      store.dispatch(setSortBy('company'));
      store.dispatch(setSortOrder('desc'));
      store.dispatch(setIsRefreshing(true));
      
      // Reset solo filtros
      store.dispatch(resetFilters());
      
      const state = store.getState().users;
      expect(state.selectedUser).toEqual(user);
      expect(state.ui.isRefreshing).toBe(true);
      expect(state.filters.searchTerm).toBe('');
      expect(state.filters.sortBy).toBe('name');
      expect(state.filters.sortOrder).toBe('asc');
    });

    it('debe manejar configuración inicial personalizada', () => {
      const customInitialState = {
        users: {
          selectedUser: mockUsers[1],
          filters: {
            searchTerm: 'búsqueda inicial',
            sortBy: 'email' as const,
            sortOrder: 'desc' as const,
          },
          ui: {
            isRefreshing: true,
          },
        },
      };

      const customStore = createTestStore(customInitialState);
      const state = customStore.getState().users;
      
      expect(state.selectedUser).toEqual(mockUsers[1]);
      expect(state.filters.searchTerm).toBe('búsqueda inicial');
      expect(state.filters.sortBy).toBe('email');
      expect(state.filters.sortOrder).toBe('desc');
      expect(state.ui.isRefreshing).toBe(true);
    });
  });
}); 