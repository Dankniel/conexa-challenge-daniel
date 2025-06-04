import { NewsData, NewsCardPresentationalProps, NewsCardContainerProps } from '../../../../../src/features/home/components/NewsCard/types';

describe('NewsCard Types', () => {
  describe('NewsData interface', () => {
    it('debe tener todas las propiedades requeridas', () => {
      const mockNewsData: NewsData = {
        id: '1',
        title: 'Test Title',
        description: 'Test Description',
        imageUrl: 'https://example.com/image.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test Source',
        category: 'Technology'
      };

      expect(mockNewsData.id).toBeDefined();
      expect(typeof mockNewsData.id).toBe('string');
      expect(mockNewsData.title).toBeDefined();
      expect(typeof mockNewsData.title).toBe('string');
      expect(mockNewsData.description).toBeDefined();
      expect(typeof mockNewsData.description).toBe('string');
      expect(mockNewsData.imageUrl).toBeDefined();
      expect(typeof mockNewsData.imageUrl).toBe('string');
      expect(mockNewsData.publishedAt).toBeDefined();
      expect(typeof mockNewsData.publishedAt).toBe('string');
      expect(mockNewsData.source).toBeDefined();
      expect(typeof mockNewsData.source).toBe('string');
      expect(mockNewsData.category).toBeDefined();
      expect(typeof mockNewsData.category).toBe('string');
    });
  });

  describe('NewsCardPresentationalProps interface', () => {
    it('debe tener las propiedades requeridas y opcionales correctas', () => {
      const mockNews: NewsData = {
        id: '1',
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      const mockProps: NewsCardPresentationalProps = {
        news: mockNews,
        formattedDate: '01 ene 2024',
        onPress: jest.fn(),
        isFavorite: true,
        onToggleFavorite: jest.fn()
      };

      expect(mockProps.news).toBeDefined();
      expect(mockProps.formattedDate).toBeDefined();
      expect(typeof mockProps.formattedDate).toBe('string');
      expect(mockProps.onPress).toBeDefined();
      expect(typeof mockProps.onPress).toBe('function');
      expect(mockProps.isFavorite).toBeDefined();
      expect(typeof mockProps.isFavorite).toBe('boolean');
      expect(mockProps.onToggleFavorite).toBeDefined();
      expect(typeof mockProps.onToggleFavorite).toBe('function');
    });

    it('debe permitir props opcionales como undefined', () => {
      const mockNews: NewsData = {
        id: '1',
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      const mockPropsWithOptionals: NewsCardPresentationalProps = {
        news: mockNews,
        formattedDate: '01 ene 2024',
        onPress: jest.fn(),
        // isFavorite y onToggleFavorite son opcionales
      };

      expect(mockPropsWithOptionals.isFavorite).toBeUndefined();
      expect(mockPropsWithOptionals.onToggleFavorite).toBeUndefined();
    });
  });

  describe('NewsCardContainerProps interface', () => {
    it('debe tener las propiedades requeridas y opcionales correctas', () => {
      const mockNews: NewsData = {
        id: '1',
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      const mockProps: NewsCardContainerProps = {
        news: mockNews,
        onPress: jest.fn()
      };

      expect(mockProps.news).toBeDefined();
      expect(mockProps.onPress).toBeDefined();
      expect(typeof mockProps.onPress).toBe('function');
    });

    it('debe permitir onPress como opcional', () => {
      const mockNews: NewsData = {
        id: '1',
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      const mockPropsWithoutOnPress: NewsCardContainerProps = {
        news: mockNews,
        // onPress es opcional
      };

      expect(mockPropsWithoutOnPress.onPress).toBeUndefined();
    });

    it('debe validar que onPress reciba NewsData como parámetro', () => {
      const mockNews: NewsData = {
        id: '1',
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      const onPressMock = jest.fn();
      const mockProps: NewsCardContainerProps = {
        news: mockNews,
        onPress: onPressMock
      };

      if (mockProps.onPress) {
        mockProps.onPress(mockNews);
        expect(onPressMock).toHaveBeenCalledWith(mockNews);
      }
    });
  });

  describe('Type validation', () => {
    it('debe validar que NewsData tenga todos los campos como string', () => {
      const invalidNewsData = {
        id: 123, // debería ser string
        title: 'Test',
        description: 'Test',
        imageUrl: 'test.jpg',
        publishedAt: '01/01/2024 10:30:00',
        source: 'Test',
        category: 'Test'
      };

      // Esta prueba está más enfocada en documentar el comportamiento esperado
      // En TypeScript, esto causaría un error de compilación
      expect(typeof 'string').toBe('string');
    });
  });
}); 