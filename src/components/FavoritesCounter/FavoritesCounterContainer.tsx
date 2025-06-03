import React from 'react';
import FavoritesCounterPresentational from './FavoritesCounterPresentational';
import { FavoritesCounterContainerProps } from './types';
import { useFavorites } from '../../features/home/hooks/usePosts';

const FavoritesCounterContainer = ({ 
  onPress,
  showZero = false 
}: FavoritesCounterContainerProps) => {
  const { favoritesCount } = useFavorites();

  // Lógica: decidir si mostrar el componente
  const shouldShow = favoritesCount > 0 || showZero;

  // Lógica: formatear el texto del contador
  const formatCountText = (count: number) => {
    return `${count} favorito${count !== 1 ? 's' : ''}`;
  };

  const handlePress = () => {
    console.log('Navegando a favoritos...');
    onPress?.();
  };

  // Si no debe mostrarse, retornar null
  if (!shouldShow) {
    return null;
  }

  return (
    <FavoritesCounterPresentational
      countText={formatCountText(favoritesCount)}
      onPress={handlePress}
    />
  );
};

export default FavoritesCounterContainer; 