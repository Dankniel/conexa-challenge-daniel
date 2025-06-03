import React from 'react';
import NewsCardPresentational from './NewsCardPresentational';
import { NewsCardContainerProps } from './types';

const NewsCardContainer = ({ news, onPress }: NewsCardContainerProps) => {
  const handleNewsPress = (newsData: typeof news) => {
    // Aquí se puede agregar lógica adicional como analytics, navegación, etc.
    console.log('Noticia seleccionada:', newsData.title);
    onPress?.(newsData);
  };

  return (
    <NewsCardPresentational
      news={news}
      onPress={handleNewsPress}
    />
  );
};

export default NewsCardContainer; 