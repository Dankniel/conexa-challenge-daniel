import React from 'react';
import HomeScreenPresentational from './HomeScreenPresentational';
import { useGetPostsQuery } from '../../../../store/api';
import { transformPostsToNewsData } from '../../utils/dataTransformers';
import { NewsData } from '../../components/NewsCard/types';

const HomeScreenContainer = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  const handleNewsPress = (news: NewsData) => {
    // Aquí se puede agregar lógica de navegación a detalle de noticia
    console.log('Navegando al detalle de la noticia:', news.title);
    // Ejemplo: navigation.navigate('NewsDetail', { newsId: news.id });
  };

  // Transformar datos de JSONPlaceholder al formato esperado
  const newsData = posts ? transformPostsToNewsData(posts) : [];

  if (isLoading) {
    return (
      <HomeScreenPresentational
        text="Cargando noticias..."
        news={[]}
        onNewsPress={handleNewsPress}
        isLoading={true}
      />
    );
  }

  if (error) {
    return (
      <HomeScreenPresentational
        text="Error al cargar noticias"
        news={[]}
        onNewsPress={handleNewsPress}
        hasError={true}
      />
    );
  }

  return (
    <HomeScreenPresentational
      text="Últimas Noticias"
      news={newsData}
      onNewsPress={handleNewsPress}
    />
  );
};

export default HomeScreenContainer; 