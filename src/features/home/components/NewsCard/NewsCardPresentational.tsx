import React from 'react';
import { YStack, XStack, Text, Image, Card } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { NewsCardPresentationalProps } from './types';

const NewsCardPresentational = ({ news, onPress }: NewsCardPresentationalProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handlePress = () => {
    onPress?.(news);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card
        elevate
        size="$4"
        bordered
        animation="bouncy"
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        backgroundColor="$background"
        borderColor="$borderColor"
        borderRadius="$4"
        padding="$0"
        marginBottom="$3"
        overflow="hidden"
      >
        <YStack space="$3">
          <Image
            source={{ uri: news.imageUrl }}
            width="100%"
            height={180}
            resizeMode="cover"
          />
          
          <YStack space="$2" padding="$3" paddingTop="$0">
            <XStack justifyContent="space-between" alignItems="center">
              <Text 
                fontSize="$2" 
                color="$purple10" 
                fontWeight="600"
                textTransform="uppercase"
              >
                {news.category}
              </Text>
              <Text fontSize="$2" color="$gray10">
                {formatDate(news.publishedAt)}
              </Text>
            </XStack>
            
            <Text 
              fontSize="$5" 
              fontWeight="bold" 
              color="$color12"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {news.title}
            </Text>
            
            <Text 
              fontSize="$3" 
              color="$gray11" 
              lineHeight="$4"
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {news.description}
            </Text>
            
            <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
              <Text fontSize="$2" color="$purple9" fontWeight="500">
                {news.source}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Card>
    </TouchableOpacity>
  );
};

export default NewsCardPresentational; 