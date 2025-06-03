import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { YStack, Text, Spinner } from 'tamagui';
import { AlertCircle } from '@tamagui/lucide-icons';
import { UsersScreenPresentationalProps } from './types';
import { User } from '../../../../types/user';
import UserItem from '../../components/UserItem/UserItemContainer';
import { useI18n } from '../../../../i18n';

const UsersScreenPresentational = ({
  users,
  isLoading,
  isError,
  isRefreshing,
  onRefresh,
  onSelectUser,
  paddingTop,
}: UsersScreenPresentationalProps) => {

  const { t } = useI18n();

  const renderUserItem: ListRenderItem<User> = useCallback(({ item }) => (
    <UserItem
      user={item}
      onPress={onSelectUser}
    />
  ), [onSelectUser]);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 140, // Altura estimada del item
    offset: 140 * index,
    index,
  }), []);

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  const ListHeaderComponent = useCallback(() => (
    <YStack gap="$4" mb="$4">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center">
        {t('users.title')}
      </Text>
      
      <Text fontSize="$3" color="$purple11" textAlign="center">
        {t('users.usersFound', { count: users.length })}
      </Text>
    </YStack>
  ), [users.length, t]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <Spinner size="large" color="$purple10" />
          <Text fontSize="$5" color="$purple11" textAlign="center">
            {t('users.loadingUsers')}
          </Text>
        </YStack>
      );
    }

    if (isError) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <AlertCircle size={48} color="$red10" />
          <Text fontSize="$5" color="$red11" textAlign="center" fontWeight="600">
            {t('users.errorLoadingUsers')}
          </Text>
          <Text fontSize="$4" color="$purple11" textAlign="center">
            {t('users.pullToRetry')}
          </Text>
        </YStack>
      );
    }

    return (
      <YStack ai="center" jc="center" py="$8" gap="$4">
        <Text fontSize="$5" color="$purple11" textAlign="center" fontWeight="600">
          {t('users.noUsersFound')}
        </Text>
        <Text fontSize="$4" color="$purple10" textAlign="center">
          {t('users.tryDifferentSearch')}
        </Text>
      </YStack>
    );
  }, [isLoading, isError, t]);

  return (
    <YStack f={1} backgroundColor="$purple1" paddingTop={paddingTop}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ 
          padding: 16,
          paddingBottom: 100,
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#8B5CF6"
            colors={['#8B5CF6']}
          />
        }
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={15}
        windowSize={10}
      />
    </YStack>
  );
};

export default UsersScreenPresentational; 