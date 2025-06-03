import React, { useCallback } from 'react';
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
}: UsersScreenPresentationalProps) => {

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
        Usuarios
      </Text>
      
      <Text fontSize="$3" color="$purple11" textAlign="center">
        {users.length} usuario{users.length !== 1 ? 's' : ''} encontrado{users.length !== 1 ? 's' : ''}
      </Text>
    </YStack>
  ), [users.length]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <Spinner size="large" color="$purple10" />
          <Text fontSize="$5" color="$purple11" textAlign="center">
            Cargando usuarios...
          </Text>
        </YStack>
      );
    }

    if (isError) {
      return (
        <YStack ai="center" jc="center" py="$8" gap="$4">
          <AlertCircle size={48} color="$red10" />
          <Text fontSize="$5" color="$red11" textAlign="center" fontWeight="600">
            Error al cargar usuarios
          </Text>
          <Text fontSize="$4" color="$purple11" textAlign="center">
            Desliza hacia abajo para intentar de nuevo
          </Text>
        </YStack>
      );
    }

    return (
      <YStack ai="center" jc="center" py="$8" gap="$4">
        <Text fontSize="$5" color="$purple11" textAlign="center" fontWeight="600">
          No se encontraron usuarios
        </Text>
        <Text fontSize="$4" color="$purple10" textAlign="center">
          Intenta con un término de búsqueda diferente
        </Text>
      </YStack>
    );
  }, [isLoading, isError]);

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