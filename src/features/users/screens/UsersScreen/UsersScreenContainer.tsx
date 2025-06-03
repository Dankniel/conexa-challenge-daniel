import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUsers } from '../../../../hooks/useUsers';
import UsersScreenPresentational from './UsersScreenPresentational';

const UsersScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const {
    users,
    isLoading,
    isError,
    isRefreshing,
    actions
  } = useUsers();

  // Calcular padding top para evitar superposición
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const paddingTop = insets.top + statusBarHeight + 20;

  return (
    <UsersScreenPresentational
      users={users}
      isLoading={isLoading}
      isError={isError}
      isRefreshing={isRefreshing}
      onRefresh={actions.onRefresh}
      onSelectUser={actions.onSelectUser}
      paddingTop={paddingTop}
    />
  );
};

export default UsersScreenContainer; 