import React from 'react';
import NewsCardPresentational from './NewsCardPresentational';
import { NewsCardContainerProps } from './types';
import { usePostFavorite } from '../../hooks/usePosts';

const NewsCardContainer = ({ news, onPress }: NewsCardContainerProps) => {
  const { isFavorite, toggleFavorite } = usePostFavorite(news.id);

  const formatDate = (dateString: string) => {
    try {
      // El formato que viene del backend es "04/02/2023 13:25:21" (DD/MM/YYYY HH:mm:ss)
      // Necesitamos transformarlo a un formato que Date pueda entender
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      
      // Crear la fecha en formato ISO: YYYY-MM-DDTHH:mm:ss
      const isoDateString = `${year}-${month}-${day}T${timePart}`;
      const date = new Date(isoDateString);
      
      // Verificar que la fecha es válida
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
  };

  const handleNewsPress = () => {
    // Aquí se puede agregar lógica adicional como analytics, navegación, etc.
    console.log('Noticia seleccionada:', news.title);
    onPress?.(news);
  };

  const handleToggleFavorite = () => {
    console.log('Toggling favorite for post:', news.id);
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