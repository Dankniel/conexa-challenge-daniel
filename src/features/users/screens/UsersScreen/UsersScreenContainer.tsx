import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUsers } from '../../../../hooks/useUsers';
import { useI18n } from '../../../../i18n';
import UsersScreenPresentational from './UsersScreenPresentational';

const UsersScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
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

  // Preparar textos traducidos
  const texts = {
    title: t('users.title'),
    usersFound: (count: number) => t('users.usersFound', { count }),
    loadingUsers: t('users.loadingUsers'),
    errorLoadingUsers: t('users.errorLoadingUsers'),
    pullToRetry: t('users.pullToRetry'),
    noUsersFound: t('users.noUsersFound'),
    tryDifferentSearch: t('users.tryDifferentSearch')
  };

  return (
    <UsersScreenPresentational
      users={users}
      isLoading={isLoading}
      isError={isError}
      isRefreshing={isRefreshing}
      onRefresh={actions.onRefresh}
      onSelectUser={actions.onSelectUser}
      paddingTop={paddingTop}
      texts={texts}
    />
  );
};

export default UsersScreenContainer; 