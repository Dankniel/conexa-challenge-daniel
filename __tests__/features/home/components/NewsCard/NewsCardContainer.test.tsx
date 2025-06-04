import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsCardContainer from '../../../../../src/features/home/components/NewsCard/NewsCardContainer';
import { NewsData } from '../../../../../src/features/home/components/NewsCard/types';

// Mockear el hook usePostFavorite
const mockToggleFavorite = jest.fn();
let mockIsFavorite = false;
jest.mock('../../../../../src/features/home/hooks/usePosts', () => ({
  usePostFavorite: jest.fn(() => ({ 
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite
  })),
}));

// Mockear el componente presentacional para espiar sus props
jest.mock('../../../../../src/features/home/components/NewsCard/NewsCardPresentational', () => {
  const RealComponent = jest.requireActual('../../../../../src/features/home/components/NewsCard/NewsCardPresentational');
  // Usamos un componente funcional simple que renderiza null pero nos permite espiar las props
  // o podemos usar jest.fn() si solo queremos verificar que se llama con ciertas props.
  // Por simplicidad y para poder interactuar con él, le pasamos las props a un mock.
  const MockPresentational = jest.fn((props) => <div {...props} data-testid="mock-presentational" />); 
  return MockPresentational;
});

// Importar el presentacional mockeado después de mockearlo
import NewsCardPresentational from '../../../../../src/features/home/components/NewsCard/NewsCardPresentational';


const mockNews: NewsData = {
  id: '1',
  title: 'Test News Title',
  description: 'Test News Description',
  imageUrl: 'https://example.com/image.png',
  source: 'Test Source',
  publishedAt: '15/07/2024 10:30:00', // Formato esperado dd/mm/yyyy HH:MM:SS
  category: 'Test Category',
};

describe('NewsCardContainer', () => {
  let mockOnPress: jest.Mock;

  beforeEach(() => {
    // Resetear mocks antes de cada test
    mockOnPress = jest.fn();
    mockToggleFavorite.mockClear();
    (NewsCardPresentational as jest.Mock).mockClear();
    // Resetear el valor de isFavorite para cada test si es necesario
    mockIsFavorite = false; 
    // Actualizar el mock del hook para que use el valor actualizado de mockIsFavorite
    (require('../../../../../src/features/home/hooks/usePosts').usePostFavorite).mockImplementation(() => ({
        isFavorite: mockIsFavorite,
        toggleFavorite: mockToggleFavorite,
    }));
  });

  it('debería renderizar y pasar las props correctas a NewsCardPresentational', () => {
    render(<NewsCardContainer news={mockNews} onPress={mockOnPress} />);

    expect(NewsCardPresentational).toHaveBeenCalledTimes(1);
    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];

    expect(presentationalProps.news).toEqual(mockNews);
    expect(presentationalProps.formattedDate).toBe('15 jul 2024'); // Verificar formato de fecha
    expect(presentationalProps.isFavorite).toBe(mockIsFavorite);
  });

  it('debería llamar a onPress cuando se presiona la tarjeta', () => {
    render(<NewsCardContainer news={mockNews} onPress={mockOnPress} />);
    
    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];
    presentationalProps.onPress(); // Simular llamada desde el presentacional

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(mockNews);
  });

  it('debería llamar a toggleFavorite cuando se presiona el botón de favorito', () => {
    render(<NewsCardContainer news={mockNews} onPress={mockOnPress} />);

    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];
    presentationalProps.onToggleFavorite(); // Simular llamada desde el presentacional

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('debería pasar isFavorite=true si el hook lo devuelve', () => {
    mockIsFavorite = true;
    // Re-configurar el mock del hook para el caso específico de este test
    (require('../../../../../src/features/home/hooks/usePosts').usePostFavorite).mockImplementation(() => ({
        isFavorite: mockIsFavorite,
        toggleFavorite: mockToggleFavorite,
    }));

    render(<NewsCardContainer news={mockNews} onPress={mockOnPress} />);
    
    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];
    expect(presentationalProps.isFavorite).toBe(true);
  });

  it('debería manejar una fecha inválida correctamente', () => {
    const newsWithInvalidDate = { ...mockNews, publishedAt: 'invalid-date' };
    render(<NewsCardContainer news={newsWithInvalidDate} onPress={mockOnPress} />);

    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];
    expect(presentationalProps.formattedDate).toBe('Fecha inválida');
  });

 it('debería manejar el caso en que onPress no se proporciona', () => {
    // Renderizar sin la prop onPress
    render(<NewsCardContainer news={mockNews} />); 
    const presentationalProps = (NewsCardPresentational as jest.Mock).mock.calls[0][0];
    
    // Intentar llamar a onPress a través del presentacional
    // Esto no debería causar un error si se maneja correctamente en el contenedor
    expect(() => presentationalProps.onPress()).not.toThrow();
    // mockOnPress (si estuviera definido) no debería haber sido llamado
  });

}); 