import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform, StatusBar } from 'react-native';

// Mock completo de todos los módulos necesarios
jest.mock('../../../../../src/navigation/types', () => ({}));

jest.mock('../../../../../src/features/home/components/NewsCard/types', () => ({
  NewsData: {}
}));

// Mock de React Navigation
const mockGoBack = jest.fn();
const mockNavigation = { goBack: mockGoBack };
const mockNewsData = {
  id: 'test-news-id',
  title: 'Test News Title',
  description: 'Detailed description of the test news.',
  imageUrl: 'https://example.com/news-image.jpg',
  publishedAt: '10/10/2024 14:30:00',
  source: 'Test Source',
  category: 'Technology',
};
let mockRoute = { params: { news: { ...mockNewsData } } };

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

// Mock de react-native-safe-area-context
const mockInsets = { top: 20, bottom: 30, left: 0, right: 0 };
jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => mockInsets,
}));

// Mock del hook usePostFavorite
const mockToggleFavorite = jest.fn();
let mockIsFavorite = false;
jest.mock('../../../../../src/features/home/hooks/usePosts', () => ({
  usePostFavorite: jest.fn(() => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  })),
}));

// Mock del componente presentacional
const MockNewsDetailScreenPresentational = jest.fn(() => null);
jest.mock('../../../../../src/features/news-detail/screens/NewsDetailScreen/NewsDetailScreenPresentational', () => ({
  __esModule: true,
  default: MockNewsDetailScreenPresentational,
}));

// Importar después de los mocks
const NewsDetailScreenContainer = require('../../../../../src/features/news-detail/screens/NewsDetailScreen/NewsDetailScreenContainer').default;

describe('NewsDetailScreenContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsFavorite = false;
    mockRoute = { params: { news: { ...mockNewsData } } };
    Platform.OS = 'android';
    StatusBar.currentHeight = 24;
  });

  it('debería renderizar el componente sin errores', () => {
    render(<NewsDetailScreenContainer />);
    expect(MockNewsDetailScreenPresentational).toHaveBeenCalledTimes(1);
  });

  it('debería llamar al componente presentacional', () => {
    render(<NewsDetailScreenContainer />);    
    expect(MockNewsDetailScreenPresentational).toHaveBeenCalledTimes(1);
  });
}); 