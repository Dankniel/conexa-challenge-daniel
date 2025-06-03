import React, { useMemo } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreenPresentational from './HomeScreenPresentational';
import { transformPostsToNewsData } from '../../utils/dataTransformers';
import { NewsData } from '../../components/NewsCard/types';
import { usePosts } from '../../hooks/usePosts';
import { HomeScreenNavigationProp } from '../../../../navigation/types';
import { useI18n } from '../../../../i18n';

const HomeScreenContainer = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const { posts, isLoading, error, searchQuery } = usePosts();
  const { t } = useI18n();

  const handleNewsPress = (news: NewsData) => {
    
    try {
      navigation.navigate('NewsDetail', { news });
    } catch (error) {
      // Navigation error handled silently
    }
  };

  const handleNavigateToFavorites = () => {
    // Navegación inmediata sin esperar a ningún estado
    navigation.navigate('Favorites');
  };

  // Calcular estilos de layout
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const hasNavigationButtons = Platform.OS === 'android' && insets.bottom > 10;
  
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') return 80;
    if (hasNavigationButtons) return 70 + insets.bottom + 20;
    return 70;
  };

  const layoutStyles = {
    paddingTop: insets.top + statusBarHeight + 10,
    paddingBottom: hasNavigationButtons ? insets.bottom : 20,
    contentPaddingBottom: getTabBarHeight() + 20
  };

  // Preparar textos traducidos
  const texts = {
    searchPlaceholder: t('home.searchPlaceholder'),
    loadingNews: t('home.loadingNews'),
    errorLoadingNews: t('home.errorLoadingNews'),
    checkConnection: t('home.checkConnection'),
    noNewsFound: t('home.noNewsFound'),
    tryOtherTerms: t('home.tryOtherTerms')
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
      onNavigateToFavorites: handleNavigateToFavorites,
      texts,
      layoutStyles
    };
  }, [posts, isLoading, error, searchQuery, t, texts, layoutStyles]);

  return (
    <HomeScreenPresentational {...screenState} />
  );
};

export default HomeScreenContainer; 