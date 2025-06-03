import React from 'react';
import NewsCardPresentational from './NewsCardPresentational';
import { NewsCardContainerProps } from './types';
import { usePostFavorite } from '../../hooks/usePosts';

const NewsCardContainer = ({ news, onPress }: NewsCardContainerProps) => {
  const { isFavorite, toggleFavorite } = usePostFavorite(news.id);

  const handleNewsPress = (newsData: typeof news) => {
    // Aquí se puede agregar lógica adicional como analytics, navegación, etc.
    console.log('Noticia seleccionada:', newsData.title);
    onPress?.(newsData);
  };

  const handleToggleFavorite = () => {
    console.log('Toggling favorite for post:', news.id);
    toggleFavorite();
  };

  return (
    <NewsCardPresentational
      news={news}
      onPress={handleNewsPress}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default NewsCardContainer; 