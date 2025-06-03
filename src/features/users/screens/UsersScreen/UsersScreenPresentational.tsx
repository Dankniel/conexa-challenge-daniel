import React from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { YStack, Text, Spinner } from 'tamagui';
import { AlertCircle } from '@tamagui/lucide-icons';
import { UsersScreenPresentationalProps } from './types';
import { User } from '../../../../types/user';
import UserItem from '../../components/UserItem/UserItemContainer';

const UsersScreenPresentational = ({
  users,
  isLoading,
  isError,
  isRefreshing,
  onRefresh,
  onSelectUser,
  paddingTop,
  texts,
}: UsersScreenPresentationalProps) => {

  const renderUserItem: ListRenderItem<User> = ({ item }) => (
    <UserItem
      user={item}
      onPress={onSelectUser}
    />
  );

  const getItemLayout = (data: any, index: number) => ({
    length: 140, // Altura estimada del item
    offset: 140 * index,
    index,
  });

  const keyExtractor = (item: User) => item.id.toString();

  const ListHeaderComponent = () => (
    <YStack gap="$4" mb="$4">
      <Text fontSize="$8" color="$purple12" fontWeight="bold" textAlign="center">
        {texts.title}
      </Text>
      
      <Text fontSize="$3" color="$purple11" textAlign="center">
        {texts.usersFound(users.length)}
      </Text>
    </YStack>
  );

  const ListEmptyComponent = () => {
    if (isLoading) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <Spinner size="large" color="$purple10" />
          <Text fontSize="$5" color="$purple11" textAlign="center">
            {texts.loadingUsers}
          </Text>
        </YStack>
      );
    }

    if (isError) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <AlertCircle size={48} color="$red10" />
          <Text fontSize="$5" color="$red11" textAlign="center" fontWeight="600">
            {texts.errorLoadingUsers}
          </Text>
          <Text fontSize="$4" color="$purple11" textAlign="center">
            {texts.pullToRetry}
          </Text>
        </YStack>
      );
    }

    return (
      <YStack ai="center" jc="center" py="$8" gap="$4">
        <Text fontSize="$5" color="$purple11" textAlign="center" fontWeight="600">
          {texts.noUsersFound}
        </Text>
        <Text fontSize="$4" color="$purple10" textAlign="center">
          {texts.tryDifferentSearch}
        </Text>
      </YStack>
    );
  };

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