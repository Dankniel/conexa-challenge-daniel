import { FavoritesScreenPresentationalProps } from '../../../../../src/features/favorites/screens/FavoritesScreen/types';
import { NewsData } from '../../../../../src/features/home/components/NewsCard/types';

describe('Tipos de FavoritesScreen', () => {
  describe('FavoritesScreenPresentationalProps', () => {
    const mockNewsData: NewsData = {
      id: '1',
      title: 'Test News',
      description: 'Test Description',
      imageUrl: 'https://example.com/image.jpg',
      source: 'Test Source',
      publishedAt: '2024-01-01',
      category: 'Test Category'
    };

    const mockTexts = {
      title: 'Favoritos',
      loadingFavorites: 'Cargando favoritos...',
      momentPlease: 'Un momento por favor',
      noFavorites: 'No tienes favoritos',
      addFromHome: 'Agrega desde la pantalla principal',
      favoritesCount: (count: number) => `${count} favoritos`
    };

    it('debería aceptar todas las propiedades requeridas', () => {
      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [mockNewsData],
        isLoading: false,
        onGoBack: jest.fn(),
        onNewsPress: jest.fn(),
        paddingTop: 50,
        paddingBottom: 20,
        contentPaddingBottom: 100,
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      // Verificar que las propiedades están correctamente tipadas
      expect(typeof props.favoriteNews).toBe('object');
      expect(Array.isArray(props.favoriteNews)).toBe(true);
      expect(typeof props.isLoading).toBe('boolean');
      expect(typeof props.onGoBack).toBe('function');
      expect(typeof props.onNewsPress).toBe('function');
      expect(typeof props.paddingTop).toBe('number');
      expect(typeof props.paddingBottom).toBe('number');
      expect(typeof props.contentPaddingBottom).toBe('number');
      expect(typeof props.statusBarBackgroundColor).toBe('string');
      expect(typeof props.statusBarStyle).toBe('string');
      expect(typeof props.texts).toBe('object');
    });

    it('debería validar los tipos de StatusBar correctos', () => {
      const validStatusBarStyles: Array<'default' | 'light-content' | 'dark-content'> = [
        'default',
        'light-content', 
        'dark-content'
      ];

      validStatusBarStyles.forEach(style => {
        const props: FavoritesScreenPresentationalProps = {
          favoriteNews: [],
          isLoading: false,
          onGoBack: jest.fn(),
          onNewsPress: jest.fn(),
          paddingTop: 50,
          paddingBottom: 20,
          contentPaddingBottom: 100,
          statusBarBackgroundColor: 'transparent',
          statusBarStyle: style,
          texts: mockTexts
        };

        expect(props.statusBarStyle).toBe(style);
      });
    });

    it('debería validar la estructura del objeto texts', () => {
      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [],
        isLoading: false,
        onGoBack: jest.fn(),
        onNewsPress: jest.fn(),
        paddingTop: 50,
        paddingBottom: 20,
        contentPaddingBottom: 100,
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      // Verificar que texts tiene todas las propiedades requeridas
      expect(props.texts).toHaveProperty('title');
      expect(props.texts).toHaveProperty('loadingFavorites');
      expect(props.texts).toHaveProperty('momentPlease');
      expect(props.texts).toHaveProperty('noFavorites');
      expect(props.texts).toHaveProperty('addFromHome');
      expect(props.texts).toHaveProperty('favoritesCount');

      // Verificar que favoritesCount es una función
      expect(typeof props.texts.favoritesCount).toBe('function');
      
      // Verificar que la función favoritesCount funciona correctamente
      expect(props.texts.favoritesCount(0)).toBe('0 favoritos');
      expect(props.texts.favoritesCount(1)).toBe('1 favoritos');
      expect(props.texts.favoritesCount(5)).toBe('5 favoritos');
    });

    it('debería aceptar un array vacío de favoriteNews', () => {
      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [],
        isLoading: false,
        onGoBack: jest.fn(),
        onNewsPress: jest.fn(),
        paddingTop: 50,
        paddingBottom: 20,
        contentPaddingBottom: 100,
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      expect(props.favoriteNews).toEqual([]);
      expect(props.favoriteNews.length).toBe(0);
    });

    it('debería aceptar múltiples elementos en favoriteNews', () => {
      const mockNews2: NewsData = {
        id: '2',
        title: 'Test News 2',
        description: 'Test Description 2',
        imageUrl: 'https://example.com/image2.jpg',
        source: 'Test Source 2',
        publishedAt: '2024-01-02',
        category: 'Test Category 2'
      };

      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [mockNewsData, mockNews2],
        isLoading: false,
        onGoBack: jest.fn(),
        onNewsPress: jest.fn(),
        paddingTop: 50,
        paddingBottom: 20,
        contentPaddingBottom: 100,
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      expect(props.favoriteNews.length).toBe(2);
      expect(props.favoriteNews[0]).toEqual(mockNewsData);
      expect(props.favoriteNews[1]).toEqual(mockNews2);
    });

    it('debería validar los tipos de las funciones callback', () => {
      const mockOnGoBack = jest.fn();
      const mockOnNewsPress = jest.fn();

      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [mockNewsData],
        isLoading: false,
        onGoBack: mockOnGoBack,
        onNewsPress: mockOnNewsPress,
        paddingTop: 50,
        paddingBottom: 20,
        contentPaddingBottom: 100,
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      // Verificar que las funciones pueden ser llamadas correctamente
      props.onGoBack();
      expect(mockOnGoBack).toHaveBeenCalledTimes(1);

      props.onNewsPress(mockNewsData);
      expect(mockOnNewsPress).toHaveBeenCalledWith(mockNewsData);
    });

    it('debería validar los tipos numéricos para padding', () => {
      const props: FavoritesScreenPresentationalProps = {
        favoriteNews: [],
        isLoading: false,
        onGoBack: jest.fn(),
        onNewsPress: jest.fn(),
        paddingTop: 100.5,  // Debería aceptar decimales
        paddingBottom: 0,   // Debería aceptar cero
        contentPaddingBottom: -10, // Debería aceptar negativos (aunque no sea recomendado)
        statusBarBackgroundColor: 'transparent',
        statusBarStyle: 'dark-content',
        texts: mockTexts
      };

      expect(typeof props.paddingTop).toBe('number');
      expect(typeof props.paddingBottom).toBe('number');
      expect(typeof props.contentPaddingBottom).toBe('number');
      expect(props.paddingTop).toBe(100.5);
      expect(props.paddingBottom).toBe(0);
      expect(props.contentPaddingBottom).toBe(-10);
    });
  });

  describe('Compatibilidad con NewsData', () => {
    it('debería ser compatible con la estructura de NewsData', () => {
      const newsData: NewsData = {
        id: 'test-id',
        title: 'Test Title',
        description: 'Test Description',
        imageUrl: 'https://example.com/test.jpg',
        source: 'Test Source',
        publishedAt: '2024-01-01T00:00:00Z',
        category: 'Test Category'
      };

      // Verificar que NewsData tiene todas las propiedades requeridas
      expect(newsData).toHaveProperty('id');
      expect(newsData).toHaveProperty('title');
      expect(newsData).toHaveProperty('description');
      expect(newsData).toHaveProperty('imageUrl');
      expect(newsData).toHaveProperty('source');
      expect(newsData).toHaveProperty('publishedAt');
      expect(newsData).toHaveProperty('category');

      // Verificar que los tipos son correctos
      expect(typeof newsData.id).toBe('string');
      expect(typeof newsData.title).toBe('string');
      expect(typeof newsData.description).toBe('string');
      expect(typeof newsData.imageUrl).toBe('string');
      expect(typeof newsData.source).toBe('string');
      expect(typeof newsData.publishedAt).toBe('string');
      expect(typeof newsData.category).toBe('string');
    });
  });
}); 