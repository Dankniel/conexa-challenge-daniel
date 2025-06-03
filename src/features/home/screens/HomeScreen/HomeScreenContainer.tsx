import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import HomeScreenPresentational from './HomeScreenPresentational';
import { transformPostsToNewsData } from '../../utils/dataTransformers';
import { NewsData } from '../../components/NewsCard/types';
import { usePosts } from '../../hooks/usePosts';
import { HomeScreenNavigationProp } from '../../../../navigation/types';

const HomeScreenContainer = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { posts, isLoading, error, searchQuery } = usePosts();

  const handleNewsPress = (news: NewsData) => {
    // Aquí se puede agregar lógica de navegación a detalle de noticia
    console.log('Navegando al detalle de la noticia:', news.title);
    // Ejemplo: navigation.navigate('NewsDetail', { newsId: news.id });
  };

  const handleNavigateToFavorites = () => {
    // Navegación inmediata sin esperar a ningún estado
    navigation.navigate('Favorites');
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
      onNewsPress: handleNewsPress,
      onNavigateToFavorites: handleNavigateToFavorites
    };
  }, [posts, isLoading, error, searchQuery]);

  return (
    <HomeScreenPresentational {...screenState} />
  );
};

export default HomeScreenContainer; 