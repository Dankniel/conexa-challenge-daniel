import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import HomeScreenPresentational from './HomeScreenPresentational';
import { transformPostsToNewsData } from '../../utils/dataTransformers';
import { NewsData } from '../../components/NewsCard/types';
import { usePosts } from '../../hooks/usePosts';
import { HomeScreenNavigationProp } from '../../../../navigation/types';
import { useI18n } from '../../../../i18n';

const HomeScreenContainer = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { posts, isLoading, error, searchQuery } = usePosts();
  const { t } = useI18n();

  const handleNewsPress = (news: NewsData) => {
    
    try {
      navigation.navigate('NewsDetail', { news });
    } catch (error) {
      console.error('navigation error:', error);
    }
  };

  const handleNavigateToFavorites = () => {
    // Navegación inmediata sin esperar a ningún estado
    navigation.navigate('Favorites');
  };

  // Estado unificado para el presentational
  const screenState = useMemo(() => {
    const newsData = posts ? transformPostsToNewsData(posts) : [];
    
    const displayText = searchQuery 
      ? `${t('home.searchResults')}: "${searchQuery}"` 
      : t('home.latestNews');

    return {
      text: displayText,
      news: newsData,
      isLoading,
      hasError: !!error,
      onNewsPress: handleNewsPress,
      onNavigateToFavorites: handleNavigateToFavorites
    };
  }, [posts, isLoading, error, searchQuery, t]);

  return (
    <HomeScreenPresentational {...screenState} />
  );
};

export default HomeScreenContainer; 