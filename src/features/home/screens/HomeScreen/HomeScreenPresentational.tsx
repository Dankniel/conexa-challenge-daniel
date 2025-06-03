import React from 'react';
import { YStack, XStack, Text, Spinner } from 'tamagui';
import { FlatList, StatusBar, Platform } from 'react-native';
import { HomeScreenPresentationalProps } from './types';
import { NewsData } from '../../components/NewsCard/types';
import NewsCardContainer from '../../components/NewsCard/NewsCardContainer';
import SearchBarContainer from '../../../../components/SearchBar/SearchBarContainer';
import FavoritesCounterContainer from '../../../../components/FavoritesCounter/FavoritesCounterContainer';

const HomeScreenPresentational = ({ 
  text, 
  news, 
  onNewsPress, 
  onNavigateToFavorites,
  isLoading = false, 
  hasError = false,
  texts,
  layoutStyles
}: HomeScreenPresentationalProps) => {
  
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
        <YStack gap="$2" alignItems="center" marginTop="$8">
          <Spinner size="large" color="$purple10" />
          <Text fontSize="$4" color="$purple10">
            {texts.loadingNews}
          </Text>
        </YStack>
      );
    }
    
    if (hasError) {
      return (
        <YStack gap="$2" alignItems="center" marginTop="$8">
          <Text fontSize="$6" color="$red10" textAlign="center">
            ⚠️ {texts.errorLoadingNews}
          </Text>
          <Text fontSize="$4" color="$purple10" textAlign="center">
            {texts.checkConnection}
          </Text>
        </YStack>
      );
    }
    
    if (news.length === 0) {
      return (
        <YStack gap="$2" alignItems="center" marginTop="$8">
          <Text fontSize="$6" color="$gray10" textAlign="center">
            🔍 {texts.noNewsFound}
          </Text>
          <Text fontSize="$4" color="$gray9" textAlign="center">
            {texts.tryOtherTerms}
          </Text>
        </YStack>
      );
    }
    
    return null;
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingTop={layoutStyles.paddingTop}
      paddingBottom={layoutStyles.paddingBottom}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      
      <YStack paddingHorizontal="$4" marginBottom="$4" gap="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <Text
            fontSize="$8"
            fontWeight="bold"
            color="$color12"
            flex={1}
          >
            {text}
          </Text>
          <FavoritesCounterContainer onPress={onNavigateToFavorites} />
        </XStack>
        
        <SearchBarContainer 
          placeholder={texts.searchPlaceholder}
        />
      </YStack>

      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: layoutStyles.contentPaddingBottom,
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

export default HomeScreenPresentational; 