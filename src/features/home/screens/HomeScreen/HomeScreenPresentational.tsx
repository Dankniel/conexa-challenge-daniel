import React from 'react';
import { YStack, Text, Spinner } from 'tamagui';
import { FlatList, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenPresentationalProps } from './types';
import { NewsData } from '../../components/NewsCard/types';
import NewsCardContainer from '../../components/NewsCard/NewsCardContainer';

const HomeScreenPresentational = ({ 
  text, 
  news, 
  onNewsPress, 
  isLoading = false, 
  hasError = false 
}: HomeScreenPresentationalProps) => {
  
  const insets = useSafeAreaInsets();
  
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
            Cargando noticias...
          </Text>
        </YStack>
      );
    }
    
    if (hasError) {
      return (
        <YStack gap="$2" alignItems="center" marginTop="$8">
          <Text fontSize="$6" color="$red10" textAlign="center">
            ⚠️ Error al cargar las noticias
          </Text>
          <Text fontSize="$4" color="$purple10" textAlign="center">
            Por favor, verifica tu conexión a internet e intenta nuevamente
          </Text>
        </YStack>
      );
    }
    
    return null;
  };

  // Calcula el padding top para Android
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  
  // Detecta si el dispositivo Android tiene botones de navegación
  const hasNavigationButtons = Platform.OS === 'android' && insets.bottom > 10;
  
  // Calcula el padding bottom para el tab navigator de manera inteligente
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') return 80;
    
    // Android con botones de navegación
    if (hasNavigationButtons) {
      return 70 + insets.bottom + 20; // Incluye el padding extra
    }
    
    // Android sin botones (solo gestos)
    return 70;
  };

  return (
    <YStack f={1} backgroundColor="$purple1">
      <YStack 
        padding="$4" 
        paddingBottom="$2"
        paddingTop={Platform.OS === 'android' ? statusBarHeight + 16 : 16}
      >
        <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center">
          {text}
        </Text>
        
        {!hasError && (
          <Text 
            fontSize="$4" 
            color="$purple10" 
            textAlign="center" 
            marginTop="$2"
            marginBottom="$4"
          >
            Mantente informado con las últimas noticias
          </Text>
        )}
      </YStack>
      
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item: NewsData) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: getTabBarHeight() + 20,
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