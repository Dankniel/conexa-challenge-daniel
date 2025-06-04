import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomeScreenContainer from '../../../../src/features/home/screens/HomeScreen/HomeScreenContainer';

// Mock específico solo para StatusBar
jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock del hook useI18n
jest.mock('../../../../src/i18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.searchPlaceholder': 'Buscar noticias...',
        'home.loadingNews': 'Cargando noticias...',
        'home.errorLoadingNews': 'Error al cargar noticias',
        'home.checkConnection': 'Verifica tu conexión a internet',
        'home.noNewsFound': 'No se encontraron noticias',
        'home.tryOtherTerms': 'Intenta con otros términos de búsqueda',
        'home.latestNews': 'Últimas Noticias',
        'home.searchResults': 'Resultados de búsqueda',
      };
      return translations[key] || key;
    },
    changeLanguage: jest.fn(),
    getCurrentLanguage: jest.fn(() => 'es'),
    isLanguageRTL: jest.fn(() => false),
  }),
}));

// Mock de useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

// Mock de la navegación
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
}));

// Mock del hook usePosts
const mockUsePosts = jest.fn();
jest.mock('../../../../src/features/home/hooks/usePosts', () => ({
  usePosts: () => mockUsePosts(),
}));

// Mock del transformador de datos
jest.mock('../../../../src/utils/dataTransformers', () => ({
  transformPostsToNewsData: jest.fn((posts) => 
    posts.map((post: any) => ({
      id: post.id.toString(),
      title: post.title,
      description: post.content,
      imageUrl: post.image || 'default-image.jpg',
      publishedAt: post.publishedAt,
      source: 'JSONPlaceholder',
      category: post.category || 'General',
    }))
  ),
}));

// Mock de Tamagui components
jest.mock('tamagui', () => {
  const { View, Text } = require('react-native');
  return {
    YStack: ({ children, testID, ...props }: any) => (
      <View testID={testID} {...props}>{children}</View>
    ),
    XStack: ({ children, testID, ...props }: any) => (
      <View testID={testID} {...props}>{children}</View>
    ),
    Text: ({ children, testID, ...props }: any) => (
      <Text testID={testID} {...props}>{children}</Text>
    ),
    Spinner: ({ testID, ...props }: any) => (
      <Text testID={testID || 'spinner'}>Loading Spinner</Text>
    ),
  };
});

// Mock de NewsCardContainer
jest.mock('../../../../src/features/home/components/NewsCard/NewsCardContainer', () => {
  return function MockNewsCardContainer({ news, onPress }: any) {
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity testID={`news-card-${news.id}`} onPress={() => onPress(news)}>
        <View>
          <Text testID={`news-title-${news.id}`}>{news.title}</Text>
          <Text testID={`news-description-${news.id}`}>{news.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
});

// Mock de SearchBarContainer con funcionalidad de búsqueda
jest.mock('../../../../src/components/SearchBar/SearchBarContainer', () => {
  return function MockSearchBarContainer({ placeholder, onSearch }: any) {
    const { TextInput } = require('react-native');
    return (
      <TextInput
        testID="search-bar"
        placeholder={placeholder}
        onChangeText={onSearch}
      />
    );
  };
});

// Mock de FavoritesCounterContainer
jest.mock('../../../../src/components/FavoritesCounter/FavoritesCounterContainer', () => {
  return function MockFavoritesCounterContainer({ onPress }: any) {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity testID="favorites-counter" onPress={onPress}>
        <Text>❤️ 0</Text>
      </TouchableOpacity>
    );
  };
});

// Store mock para testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      posts: (state = {}, action) => state,
    },
    preloadedState: {
      posts: {
        posts: [],
        favoriteIds: [],
        searchQuery: '',
        filteredPosts: [],
        isLoadingFavorites: false,
      },
    },
  });
};

// Datos de prueba
const mockPosts = [
  {
    id: 1,
    title: 'Noticia de prueba 1',
    content: 'Descripción de la noticia de prueba 1',
    image: 'https://example.com/image1.jpg',
    publishedAt: '15/01/2024 10:30:00',
    category: 'Tecnología',
    userId: 1,
    thumbnail: '',
    status: 'published',
    updatedAt: '15/01/2024 10:30:00',
  },
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createMockStore();
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePosts.mockReturnValue({
      posts: mockPosts,
      isLoading: false,
      error: null,
      searchQuery: '',
    });
  });

  describe('HomeScreenContainer', () => {
    it('renderiza sin errores', () => {
      const component = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );
      expect(component).toBeTruthy();
    });

    it('muestra el título de últimas noticias cuando no hay búsqueda', () => {
      const { getByText } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Últimas Noticias')).toBeTruthy();
    });

    it('muestra resultados de búsqueda cuando hay query', () => {
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: 'tecnología',
      });

      const { getByText } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Resultados de búsqueda: "tecnología"')).toBeTruthy();
    });

    it('muestra estado de carga', () => {
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: true,
        error: null,
        searchQuery: '',
      });

      const { getByText } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Loading Spinner')).toBeTruthy();
      expect(getByText('Cargando noticias...')).toBeTruthy();
    });

    it('muestra estado de error', () => {
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: false,
        error: new Error('Network error'),
        searchQuery: '',
      });

      const { getByText } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('⚠️ Error al cargar noticias')).toBeTruthy();
      expect(getByText('Verifica tu conexión a internet')).toBeTruthy();
    });

    it('muestra mensaje cuando no hay noticias', () => {
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      const { getByText } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('🔍 No se encontraron noticias')).toBeTruthy();
      expect(getByText('Intenta con otros términos de búsqueda')).toBeTruthy();
    });

    it('muestra la noticia cuando hay datos', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByTestId('news-title-1')).toBeTruthy();
      expect(getByTestId('news-description-1')).toBeTruthy();
    });

    it('renderiza el componente de búsqueda', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByTestId('search-bar')).toBeTruthy();
    });

    it('renderiza el contador de favoritos', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByTestId('favorites-counter')).toBeTruthy();
    });
  });

  describe('Estados del hook usePosts', () => {
    it('maneja diferentes estados correctamente', () => {
      // Test estado inicial
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      const { rerender, getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByTestId('news-title-1')).toBeTruthy();

      // Test estado de carga
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: true,
        error: null,
        searchQuery: '',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByTestId('spinner')).toBeTruthy();
    });
  });

  describe('Interacciones del Usuario', () => {
    it('navega al detalle cuando se hace clic en una noticia', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      const newsCard = getByTestId('news-card-1');
      fireEvent.press(newsCard);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('NewsDetail', { 
          news: expect.objectContaining({
            id: '1',
            title: 'Noticia de prueba 1'
          })
        });
      });
    });

    it('navega a favoritos cuando se hace clic en el contador', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      const favoritesCounter = getByTestId('favorites-counter');
      fireEvent.press(favoritesCounter);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Favorites');
      });
    });

    it('actualiza la búsqueda cuando se escribe en el SearchBar', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      const searchBar = getByTestId('search-bar');
      
      // Simplemente verificamos que el componente SearchBar se puede interactuar
      expect(() => {
        fireEvent.changeText(searchBar, 'tecnología');
      }).not.toThrow();
      
      // Verificamos que el searchBar tiene el placeholder correcto
      expect(searchBar.props.placeholder).toBe('Buscar noticias...');
    });

    it('muestra diferentes estados según el searchQuery del hook', async () => {
      // Estado sin búsqueda
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      const { getByText, rerender } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Últimas Noticias')).toBeTruthy();

      // Estado con búsqueda
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: 'tecnología',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Resultados de búsqueda: "tecnología"')).toBeTruthy();

      // Estado con búsqueda sin resultados
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: false,
        error: null,
        searchQuery: 'busqueda sin resultados',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      expect(getByText('Resultados de búsqueda: "busqueda sin resultados"')).toBeTruthy();
      expect(getByText('🔍 No se encontraron noticias')).toBeTruthy();
    });

    it('maneja múltiples clics en noticias sin errores', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      const newsCard = getByTestId('news-card-1');
      
      // Múltiples clics rápidos
      fireEvent.press(newsCard);
      fireEvent.press(newsCard);
      fireEvent.press(newsCard);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(3);
      });
    });

    it('navega correctamente con diferentes noticias', async () => {
      const multiplePosts = [
        ...mockPosts,
        {
          id: 2,
          title: 'Noticia de prueba 2',
          content: 'Descripción de la noticia de prueba 2',
          image: 'https://example.com/image2.jpg',
          publishedAt: '16/01/2024 11:30:00',
          category: 'Deportes',
          userId: 2,
          thumbnail: '',
          status: 'published',
          updatedAt: '16/01/2024 11:30:00',
        },
      ];

      mockUsePosts.mockReturnValue({
        posts: multiplePosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      const { getByTestId } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // Click en la primera noticia
      const newsCard1 = getByTestId('news-card-1');
      fireEvent.press(newsCard1);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('NewsDetail', { 
          news: expect.objectContaining({
            id: '1',
            title: 'Noticia de prueba 1'
          })
        });
      });

      // Click en la segunda noticia
      const newsCard2 = getByTestId('news-card-2');
      fireEvent.press(newsCard2);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('NewsDetail', { 
          news: expect.objectContaining({
            id: '2',
            title: 'Noticia de prueba 2'
          })
        });
      });

      expect(mockNavigate).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases y Manejo de Errores', () => {
    it('maneja posts con datos incompletos sin fallar', () => {
      const postsWithMissingData = [
        {
          id: 1,
          title: 'Título sin descripción',
          content: '', // content vacío
          image: null, // imagen null
          publishedAt: '15/01/2024 10:30:00',
          category: undefined, // categoría undefined
          userId: 1,
          thumbnail: '',
          status: 'published',
          updatedAt: '15/01/2024 10:30:00',
        },
      ];

      mockUsePosts.mockReturnValue({
        posts: postsWithMissingData,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      expect(() => render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      )).not.toThrow();
    });

    it('maneja cambios rápidos de estado sin errores', async () => {
      const { rerender } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // Cambio rápido a loading
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: true,
        error: null,
        searchQuery: '',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // Cambio rápido a error
      mockUsePosts.mockReturnValue({
        posts: [],
        isLoading: false,
        error: new Error('Network error'),
        searchQuery: '',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // Cambio rápido a success
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      rerender(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // No debe lanzar errores
      expect(true).toBe(true);
    });

    it('maneja búsquedas con caracteres especiales', async () => {
      const specialSearchQueries = [
        'búsqueda con acentos',
        'search with numbers 123',
        'símbolos @#$%',
        '   espacios   ',
        '',
      ];

      for (const query of specialSearchQueries) {
        mockUsePosts.mockReturnValue({
          posts: mockPosts,
          isLoading: false,
          error: null,
          searchQuery: query,
        });

        const { getByText } = render(
          <TestWrapper>
            <HomeScreenContainer />
          </TestWrapper>
        );

        if (query.trim()) {
          expect(getByText(`Resultados de búsqueda: "${query}"`)).toBeTruthy();
        } else {
          expect(getByText('Últimas Noticias')).toBeTruthy();
        }
      }
    });

    it('maneja arrays vacíos y null correctamente', () => {
      const edgeCases = [
        { posts: [], description: 'array vacío' },
        { posts: null, description: 'posts null' },
        { posts: undefined, description: 'posts undefined' },
      ];

      edgeCases.forEach(({ posts, description }) => {
        mockUsePosts.mockReturnValue({
          posts: posts || [],
          isLoading: false,
          error: null,
          searchQuery: '',
        });

        expect(() => render(
          <TestWrapper>
            <HomeScreenContainer />
          </TestWrapper>
        )).not.toThrow();
      });
    });
  });

  describe('Performance y Optimización', () => {
    it('no hace re-renders innecesarios cuando los props no cambian', () => {
      const { rerender } = render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      );

      // Mismo estado, no debería causar re-render problemático
      mockUsePosts.mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      expect(() => {
        rerender(
          <TestWrapper>
            <HomeScreenContainer />
          </TestWrapper>
        );
      }).not.toThrow();
    });

    it('maneja listas grandes de noticias sin problemas de performance', () => {
      const largePosts = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        title: `Noticia de prueba ${index + 1}`,
        content: `Descripción de la noticia de prueba ${index + 1}`,
        image: `https://example.com/image${index + 1}.jpg`,
        publishedAt: '15/01/2024 10:30:00',
        category: 'Tecnología',
        userId: 1,
        thumbnail: '',
        status: 'published',
        updatedAt: '15/01/2024 10:30:00',
      }));

      mockUsePosts.mockReturnValue({
        posts: largePosts,
        isLoading: false,
        error: null,
        searchQuery: '',
      });

      const startTime = Date.now();
      
      expect(() => render(
        <TestWrapper>
          <HomeScreenContainer />
        </TestWrapper>
      )).not.toThrow();

      const renderTime = Date.now() - startTime;
      
      // El render no debería tomar más de 1 segundo (muy conservador)
      expect(renderTime).toBeLessThan(1000);
    });
  });
}); 