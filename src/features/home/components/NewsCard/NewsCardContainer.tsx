import React from 'react';
import NewsCardPresentational from './NewsCardPresentational';
import { NewsCardContainerProps } from './types';
import { usePostFavorite } from '../../hooks/usePosts';

const NewsCardContainer = ({ news, onPress }: NewsCardContainerProps) => {
  const { isFavorite, toggleFavorite } = usePostFavorite(news.id);

  const formatDate = (dateString: string) => {
    try {

      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      const isoDateString = `${year}-${month}-${day}T${timePart}`;
      const date = new Date(isoDateString);
      
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  const handleNewsPress = () => {
    if (onPress) {
      onPress(news);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  return (
    <NewsCardPresentational
      news={news}
      formattedDate={formatDate(news.publishedAt)}
      onPress={handleNewsPress}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default NewsCardContainer; 