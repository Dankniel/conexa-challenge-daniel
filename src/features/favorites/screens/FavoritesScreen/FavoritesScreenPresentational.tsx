import React from 'react';
import { YStack, XStack, Text, Spinner, Button } from 'tamagui';
import { FlatList, StatusBar } from 'react-native';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import { FavoritesScreenPresentationalProps } from './types';
import { NewsData } from '../../../home/components/NewsCard/types';
import NewsCardContainer from '../../../home/components/NewsCard/NewsCardContainer';
import { useI18n } from '../../../../i18n';

const FavoritesScreenPresentational = ({
  favoriteNews,
  isLoading,
  onGoBack,
  onNewsPress,
  paddingTop,
  paddingBottom,
  contentPaddingBottom,
  statusBarBackgroundColor,
  statusBarStyle
}: FavoritesScreenPresentationalProps) => {
  
  const { t } = useI18n();
  
  const renderNewsItem = ({ item }: { item: NewsData }) => (
    <NewsCardContainer
      key={item.id}
      news={item}
      onPress={onNewsPress}
    />
  );

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <YStack gap="$3" alignItems="center" marginTop="$8">
          <Spinner size="large" color="$purple10" />
          <Text fontSize="$4" color="$purple10" textAlign="center">
            {t('favorites.loadingFavorites')}
          </Text>
          <Text fontSize="$3" color="$gray10" textAlign="center">
            {t('messages.momentPlease')}
          </Text>
        </YStack>
      );
    }
    
    return (
      <YStack gap="$4" alignItems="center" marginTop="$8" paddingHorizontal="$4">
        <Heart size={64} color="$gray9" />
        <Text fontSize="$6" color="$gray10" textAlign="center" fontWeight="bold">
          {t('favorites.noFavorites')}
        </Text>
        <Text fontSize="$4" color="$gray9" textAlign="center">
          {t('favorites.addFromHome')}
        </Text>
      </YStack>
    );
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        translucent
        barStyle={statusBarStyle}
      />
      
      {/* Header - Se muestra siempre, sin importar el estado de loading */}
      <YStack paddingHorizontal="$4" marginBottom="$4" gap="$3">
        <XStack alignItems="center" gap="$3">
          <Button
            size="$3"
            variant="outlined"
            circular
            onPress={onGoBack}
            borderColor="$purple10"
            backgroundColor="$purple2"
          >
            <ArrowLeft size={16} color="$purple10" />
          </Button>
          
          <XStack alignItems="center" gap="$2" flex={1}>
            <Heart size={20} color="$red10" fill="$red10" />
            <Text
              fontSize="$7"
              fontWeight="bold"
              color="$color12"
            >
              {t('favorites.title')}
            </Text>
          </XStack>
          
          <Text fontSize="$3" color="$gray10">
            {isLoading ? '...' : t('favorites.favoritesCount', { count: favoriteNews.length })}
          </Text>
        </XStack>
      </YStack>

      {/* Lista de noticias favoritas - Se muestra siempre */}
      <FlatList
        data={favoriteNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: contentPaddingBottom,
          flexGrow: 1
        }}
        ItemSeparatorComponent={() => <YStack height="$2" />}
        ListEmptyComponent={renderEmptyComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={3} 
      />
    </YStack>
  );
};

export default FavoritesScreenPresentational; 