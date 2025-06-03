import React from 'react';
import { YStack, XStack, Text, Spinner, Button } from 'tamagui';
import { FlatList, StatusBar } from 'react-native';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import { FavoritesScreenPresentationalProps } from './types';
import { NewsData } from '../../../home/components/NewsCard/types';
import NewsCardContainer from '../../../home/components/NewsCard/NewsCardContainer';

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
            Cargando favoritos...
          </Text>
          <Text fontSize="$3" color="$gray10" textAlign="center">
            Un momento por favor
          </Text>
        </YStack>
      );
    }
    
    return (
      <YStack gap="$4" alignItems="center" marginTop="$8" paddingHorizontal="$4">
        <Heart size={64} color="$gray9" />
        <Text fontSize="$6" color="$gray10" textAlign="center" fontWeight="bold">
          No hay favoritos guardados
        </Text>
        <Text fontSize="$4" color="$gray9" textAlign="center">
          Agrega noticias a tus favoritos desde la pantalla principal para verlas aquí
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
              Mis Favoritos
            </Text>
          </XStack>
          
          <Text fontSize="$3" color="$gray10">
            {isLoading ? '...' : `${favoriteNews.length} noticia${favoriteNews.length !== 1 ? 's' : ''}`}
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