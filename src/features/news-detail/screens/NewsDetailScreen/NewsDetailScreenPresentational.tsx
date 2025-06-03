import React from 'react';
import { YStack, XStack, Text, Button, Image, ScrollView } from 'tamagui';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import { NewsDetailScreenPresentationalProps } from './types';

const NewsDetailScreenPresentational = ({
  news,
  formattedDate,
  onGoBack,
  onToggleFavorite,
  isFavorite,
  paddingTop,
  paddingBottom,
  statusBarBackgroundColor,
  statusBarStyle
}: NewsDetailScreenPresentationalProps) => {
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
      
      {/* Header con botón de regreso y favorito */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$4"
        paddingBottom="$3"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
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
        
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={{ padding: 4 }}
        >
          <Heart 
            size={24} 
            color={isFavorite ? "#ef4444" : "#6b7280"}
            fill={isFavorite ? "#ef4444" : "transparent"}
          />
        </TouchableOpacity>
      </XStack>

      {/* Contenido scrolleable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
      >
        <YStack gap="$4">
          {/* Imagen principal */}
          {news.imageUrl && (
            <YStack>
              <Image
                source={{ uri: news.imageUrl }}
                width="100%"
                height={250}
                borderRadius="$4"
                resizeMode="cover"
                backgroundColor="$gray3"
              />
            </YStack>
          )}

          {/* Metadatos */}
          <YStack gap="$2">
            <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Text
                fontSize="$3"
                color="$purple10"
                fontWeight="600"
                backgroundColor="$purple3"
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius="$2"
              >
                {news.category}
              </Text>
              <Text fontSize="$3" color="$gray10">
                {formattedDate}
              </Text>
            </XStack>
            
            <Text fontSize="$3" color="$gray9" fontWeight="500">
              {news.source}
            </Text>
          </YStack>

          {/* Título */}
          <YStack>
            <Text
              fontSize="$7"
              fontWeight="bold"
              color="$color12"
              lineHeight="$7"
            >
              {news.title}
            </Text>
          </YStack>

          {/* Descripción/Contenido */}
          <YStack gap="$3">
            <Text
              fontSize="$5"
              color="$color11"
              lineHeight="$6"
              textAlign="justify"
            >
              {news.description}
            </Text>
          </YStack>

          {/* Información adicional */}
          <YStack
            gap="$3"
            backgroundColor="$gray2"
            padding="$4"
            borderRadius="$4"
            marginTop="$2"
          >
            <Text fontSize="$4" fontWeight="600" color="$color12">
              Información adicional
            </Text>
            
            <YStack gap="$2">
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10" fontWeight="500">
                  ID:
                </Text>
                <Text fontSize="$3" color="$color11" flex={1} textAlign="right">
                  {news.id}
                </Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10" fontWeight="500">
                  Fuente:
                </Text>
                <Text fontSize="$3" color="$color11" flex={1} textAlign="right">
                  {news.source}
                </Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10" fontWeight="500">
                  Categoría:
                </Text>
                <Text fontSize="$3" color="$color11" flex={1} textAlign="right">
                  {news.category}
                </Text>
              </XStack>
              
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10" fontWeight="500">
                  Fecha de publicación:
                </Text>
                <Text fontSize="$3" color="$color11" flex={1} textAlign="right">
                  {formattedDate}
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default NewsDetailScreenPresentational; 