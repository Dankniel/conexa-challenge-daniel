import React, { useMemo } from 'react';
import HomeScreenPresentational from './HomeScreenPresentational';
import { transformPostsToNewsData } from '../../utils/dataTransformers';
import { NewsData } from '../../components/NewsCard/types';
import { usePosts } from '../../hooks/usePosts';

const HomeScreenContainer = () => {
  const { posts, isLoading, error, searchQuery } = usePosts();

  const handleNewsPress = (news: NewsData) => {
    // Aquí se puede agregar lógica de navegación a detalle de noticia
    console.log('Navegando al detalle de la noticia:', news.title);
    // Ejemplo: navigation.navigate('NewsDetail', { newsId: news.id });
  };

  // Estado unificado para el presentational
  const screenState = useMemo(() => {
    const newsData = posts ? transformPostsToNewsData(posts) : [];
    
    const displayText = searchQuery 
      ? `Resultados de búsqueda: "${searchQuery}"` 
      : "Últimas Noticias";

    return {
      text: displayText,
      news: newsData,
      isLoading,
      hasError: !!error,
      onNewsPress: handleNewsPress
    };
  }, [posts, isLoading, error, searchQuery]);

  return (
    <HomeScreenPresentational {...screenState} />
  );
};

export default HomeScreenContainer; 