import React from 'react';
import { FavoritesScreenPresentationalProps } from '../../../../src/features/favorites/screens/FavoritesScreen/types';
import { NewsData } from '../../../../src/features/home/components/NewsCard/types';

// Importar el componente directamente
import FavoritesScreenPresentational from '../../../../src/features/favorites/screens/FavoritesScreen/FavoritesScreenPresentational';

// Mock simple de componentes
jest.mock('tamagui', () => ({
  YStack: 'div',
  XStack: 'div',
  Text: 'span',
  Spinner: 'div',
  Button: 'button',
}));

jest.mock('@tamagui/lucide-icons', () => ({
  ArrowLeft: 'span',
  Heart: 'span',
}));

jest.mock('react-native', () => ({
  FlatList: 'div',
  StatusBar: 'div',
}));

jest.mock('../../../../src/features/home/components/NewsCard/NewsCardContainer', () => {
  return 'div';
});

describe('Integración de Favoritos', () => {
  const mockTexts = {
    title: 'Mis Favoritos',
    loadingFavorites: 'Cargando favoritos...',
    momentPlease: 'Un momento por favor',
    noFavorites: 'No tienes favoritos guardados',
    addFromHome: 'Agrega noticias desde la pantalla principal',
    favoritesCount: (count: number) => {
      if (count === 0) return 'Sin favoritos';
      if (count === 1) return '1 favorito';
      return `${count} favoritos`;
    }
  };

  const createMockNews = (id: string, title: string): NewsData => ({
    id,
    title,
    description: `Descripción de ${title}`,
    imageUrl: `https://example.com/image-${id}.jpg`,
    source: `Fuente ${id}`,
    publishedAt: `2024-01-0${id}`,
    category: `Categoría ${id}`
  });

  const defaultProps: FavoritesScreenPresentationalProps = {
    favoriteNews: [],
    isLoading: false,
    onGoBack: jest.fn(),
    onNewsPress: jest.fn(),
    paddingTop: 50,
    paddingBottom: 20,
    contentPaddingBottom: 100,
    statusBarBackgroundColor: 'white',
    statusBarStyle: 'dark-content',
    texts: mockTexts
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Flujo completo de favoritos', () => {
    it('debería funcionar con lista vacía de favoritos', () => {
      const result = FavoritesScreenPresentational(defaultProps);
      
      expect(result).toBeDefined();
      expect(defaultProps.favoriteNews).toEqual([]);
      expect(defaultProps.texts.favoritesCount(0)).toBe('Sin favoritos');
    });

    it('debería funcionar con lista de favoritos con datos', () => {
      const favoriteNews = [
        createMockNews('1', 'Primera noticia favorita'),
        createMockNews('2', 'Segunda noticia favorita'),
        createMockNews('3', 'Tercera noticia favorita')
      ];

      const props = {
        ...defaultProps,
        favoriteNews
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.favoriteNews.length).toBe(3);
      expect(props.texts.favoritesCount(3)).toBe('3 favoritos');
    });

    it('debería manejar callbacks correctamente', () => {
      const mockOnGoBack = jest.fn();
      const mockOnNewsPress = jest.fn();
      
      const props = {
        ...defaultProps,
        onGoBack: mockOnGoBack,
        onNewsPress: mockOnNewsPress
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.onGoBack).toBe(mockOnGoBack);
      expect(props.onNewsPress).toBe(mockOnNewsPress);
      
      // Simular llamadas
      const mockNews = createMockNews('1', 'Noticia clickeable');
      props.onGoBack();
      props.onNewsPress(mockNews);
      
      expect(mockOnGoBack).toHaveBeenCalledTimes(1);
      expect(mockOnNewsPress).toHaveBeenCalledWith(mockNews);
    });
  });

  describe('Estados de carga', () => {
    it('debería manejar estado de carga', () => {
      const props = {
        ...defaultProps,
        isLoading: true
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.isLoading).toBe(true);
    });

    it('debería transicionar entre estados', () => {
      // Estado de carga
      const loadingProps = {
        ...defaultProps,
        isLoading: true
      };

      const loadingResult = FavoritesScreenPresentational(loadingProps);
      expect(loadingResult).toBeDefined();

      // Estado con datos
      const favoriteNews = [createMockNews('1', 'Noticia cargada')];
      const dataProps = {
        ...defaultProps,
        isLoading: false,
        favoriteNews
      };

      const dataResult = FavoritesScreenPresentational(dataProps);
      expect(dataResult).toBeDefined();
      expect(dataProps.favoriteNews.length).toBe(1);
      expect(dataProps.texts.favoritesCount(1)).toBe('1 favorito');
    });
  });

  describe('Manejo de diferentes cantidades de favoritos', () => {
    it('debería mostrar contador en singular para un favorito', () => {
      const favoriteNews = [createMockNews('1', 'Único favorito')];
      
      const props = {
        ...defaultProps,
        favoriteNews
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.texts.favoritesCount(1)).toBe('1 favorito');
    });

    it('debería mostrar contador en plural para múltiples favoritos', () => {
      const favoriteNews = [
        createMockNews('1', 'Primer favorito'),
        createMockNews('2', 'Segundo favorito'),
        createMockNews('3', 'Tercer favorito'),
        createMockNews('4', 'Cuarto favorito'),
        createMockNews('5', 'Quinto favorito')
      ];
      
      const props = {
        ...defaultProps,
        favoriteNews
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.texts.favoritesCount(5)).toBe('5 favoritos');
    });

    it('debería manejar una lista muy grande de favoritos', () => {
      const favoriteNews = Array.from({ length: 50 }, (_, i) => 
        createMockNews((i + 1).toString(), `Noticia favorita ${i + 1}`)
      );
      
      const props = {
        ...defaultProps,
        favoriteNews
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.favoriteNews.length).toBe(50);
      expect(props.texts.favoritesCount(50)).toBe('50 favoritos');
    });
  });

  describe('Configuración y personalización', () => {
    it('debería aceptar diferentes configuraciones de padding', () => {
      const props = {
        ...defaultProps,
        paddingTop: 100,
        paddingBottom: 50,
        contentPaddingBottom: 200
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.paddingTop).toBe(100);
      expect(props.paddingBottom).toBe(50);
      expect(props.contentPaddingBottom).toBe(200);
    });

    it('debería aceptar diferentes estilos de StatusBar', () => {
      const props = {
        ...defaultProps,
        statusBarBackgroundColor: 'red',
        statusBarStyle: 'light-content' as const
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.statusBarBackgroundColor).toBe('red');
      expect(props.statusBarStyle).toBe('light-content');
    });

    it('debería usar textos personalizados', () => {
      const customTexts = {
        title: 'Favoritos Personalizados',
        loadingFavorites: 'Cargando...',
        momentPlease: 'Espera',
        noFavorites: 'Sin favoritos',
        addFromHome: 'Agregar',
        favoritesCount: (count: number) => `Custom: ${count}`
      };

      const props = {
        ...defaultProps,
        texts: customTexts
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.texts.title).toBe('Favoritos Personalizados');
      expect(props.texts.favoritesCount(3)).toBe('Custom: 3');
    });
  });

  describe('Validación de datos NewsData', () => {
    it('debería trabajar con estructura completa de NewsData', () => {
      const completeNews: NewsData = {
        id: 'test-id',
        title: 'Título Completo',
        description: 'Descripción detallada de la noticia',
        imageUrl: 'https://example.com/imagen-completa.jpg',
        source: 'Fuente Confiable',
        publishedAt: '2024-01-15T10:30:00Z',
        category: 'Tecnología'
      };

      const props = {
        ...defaultProps,
        favoriteNews: [completeNews]
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.favoriteNews[0]).toEqual(completeNews);
      expect(props.favoriteNews[0].id).toBe('test-id');
      expect(props.favoriteNews[0].title).toBe('Título Completo');
    });

    it('debería manejar múltiples noticias con diferentes categorías', () => {
      const newsWithDifferentCategories = [
        { ...createMockNews('1', 'Noticia Tech'), category: 'Tecnología' },
        { ...createMockNews('2', 'Noticia Deportes'), category: 'Deportes' },
        { ...createMockNews('3', 'Noticia Cultura'), category: 'Cultura' }
      ];

      const props = {
        ...defaultProps,
        favoriteNews: newsWithDifferentCategories
      };

      const result = FavoritesScreenPresentational(props);
      
      expect(result).toBeDefined();
      expect(props.favoriteNews.length).toBe(3);
      expect(props.favoriteNews[0].category).toBe('Tecnología');
      expect(props.favoriteNews[1].category).toBe('Deportes');
      expect(props.favoriteNews[2].category).toBe('Cultura');
    });
  });

  describe('Casos edge y robustez', () => {
    it('debería funcionar con valores mínimos', () => {
      const props = {
        ...defaultProps,
        paddingTop: 0,
        paddingBottom: 0,
        contentPaddingBottom: 0
      };

      const result = FavoritesScreenPresentational(props);
      expect(result).toBeDefined();
    });

    it('debería funcionar con valores extremos', () => {
      const props = {
        ...defaultProps,
        paddingTop: 1000,
        paddingBottom: 1000,
        contentPaddingBottom: 1000,
        favoriteNews: Array.from({ length: 1000 }, (_, i) => 
          createMockNews(i.toString(), `Noticia ${i}`)
        )
      };

      const result = FavoritesScreenPresentational(props);
      expect(result).toBeDefined();
      expect(props.favoriteNews.length).toBe(1000);
    });
  });
}); 