import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsDetailScreenPresentational from './NewsDetailScreenPresentational';
import { NewsDetailScreenNavigationProp, HomeStackParamList } from '../../../../navigation/types';
import { usePostFavorite } from '../../../home/hooks/usePosts';

type NewsDetailScreenRouteProp = RouteProp<HomeStackParamList, 'NewsDetail'>;

const NewsDetailScreenContainer = () => {
  const navigation = useNavigation<NewsDetailScreenNavigationProp>();
  const route = useRoute<NewsDetailScreenRouteProp>();
  const insets = useSafeAreaInsets();
  
  const { news } = route.params;
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
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('error on date formatting: ', error);
      return 'Fecha inválida';
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    console.log('Toggling favorite for post:', news.id);
    toggleFavorite();
  };

  // Calcular estilos
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const hasNavigationButtons = Platform.OS === 'android' && insets.bottom > 10;
  
  const paddingTop = insets.top + statusBarHeight + 10;
  const paddingBottom = hasNavigationButtons ? insets.bottom : 20;

  return (
    <NewsDetailScreenPresentational
      news={news}
      formattedDate={formatDate(news.publishedAt)}
      onGoBack={handleGoBack}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={isFavorite}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      statusBarBackgroundColor="transparent"
      statusBarStyle="dark-content"
    />
  );
};

export default NewsDetailScreenContainer; 