import React from 'react';
import FavoritesCounterPresentational from './FavoritesCounterPresentational';
import { FavoritesCounterContainerProps } from './types';
import { useFavoritesCount } from '../../features/home/hooks/usePosts';
import { useI18n } from '../../i18n';

const FavoritesCounterContainer = ({ 
  onPress,
  showZero = false 
}: FavoritesCounterContainerProps) => {
  const { favoritesCount } = useFavoritesCount();
  const { t } = useI18n();

  // Lógica: decidir si mostrar el componente
  const shouldShow = favoritesCount > 0 || showZero;

  // Lógica: formatear el texto del contador
  const formatCountText = (count: number) => {
    return t('favorites.favoritesCount', { count });
  };

  const handlePress = () => {
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