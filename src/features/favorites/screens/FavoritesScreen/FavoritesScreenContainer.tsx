import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useI18n } from '../../../../i18n';
import FavoritesScreenPresentational from './FavoritesScreenPresentational';
import { FavoritesScreenNavigationProp } from '../../../../navigation/types';
import { NewsData } from '../../../home/components/NewsCard/types';
import { transformPostsToNewsData } from '../../../home/utils/dataTransformers';
import { selectFavoritePosts, selectIsLoadingFavorites } from '../../../../store/selectors/postsSelectors';

const FavoritesScreenContainer = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  
  // Estados locales para controlar la carga
  const [favoriteNewsData, setFavoriteNewsData] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de Redux - solo se acceden después del montaje
  const favoritePosts = useSelector(selectFavoritePosts);
  const isLoadingFavorites = useSelector(selectIsLoadingFavorites);

  // Cargar datos después del montaje del componente
  useEffect(() => {
    // Simular carga inmediata para la navegación
    const timer = setTimeout(() => {
      if (!isLoadingFavorites && favoritePosts) {
        // Siempre transformar los datos, incluido cuando la lista está vacía
        const transformedData = transformPostsToNewsData(favoritePosts);
        setFavoriteNewsData(transformedData);
      }
      setIsLoading(false);
    }, 50); // 50ms es imperceptible pero permite que la navegación sea fluida

    return () => clearTimeout(timer);
  }, [favoritePosts, isLoadingFavorites]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNewsPress = (news: NewsData) => {
    navigation.navigate('NewsDetail', { news });
  };

  // Calcular estilos
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const hasNavigationButtons = Platform.OS === 'android' && insets.bottom > 10;
  
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') return 80;
    if (hasNavigationButtons) return 70 + insets.bottom + 20;
    return 70;
  };

  const paddingTop = insets.top + statusBarHeight + 10;
  const paddingBottom = hasNavigationButtons ? insets.bottom : 20;
  const contentPaddingBottom = getTabBarHeight() + 20;

  // Preparar textos traducidos
  const texts = {
    title: t('favorites.title'),
    loadingFavorites: t('favorites.loadingFavorites'),
    momentPlease: t('messages.momentPlease'),
    noFavorites: t('favorites.noFavorites'),
    addFromHome: t('favorites.addFromHome'),
    favoritesCount: (count: number) => t('favorites.favoritesCount', { count })
  };

  return (
    <FavoritesScreenPresentational
      favoriteNews={favoriteNewsData}
      isLoading={isLoading}
      onGoBack={handleGoBack}
      onNewsPress={handleNewsPress}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      contentPaddingBottom={contentPaddingBottom}
      statusBarBackgroundColor="transparent"
      statusBarStyle="dark-content"
      texts={texts}
    />
  );
};

export default FavoritesScreenContainer; 