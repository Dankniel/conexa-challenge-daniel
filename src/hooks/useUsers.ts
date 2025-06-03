import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../store/api/usersApi';
import { 
  setSelectedUser,
  setIsRefreshing,
} from '../store/slices/usersSlice';
import {
  selectIsRefreshing,
} from '../store/selectors/usersSelectors';
import { User } from '../types/user';

export const useUsers = () => {
  const dispatch = useDispatch();
  
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery();

  const isRefreshing = useSelector(selectIsRefreshing);

  const handleSelectUser = useCallback((user: User) => {
    dispatch(setSelectedUser(user));
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    dispatch(setIsRefreshing(true));
    try {
      await refetch();
    } finally {
      dispatch(setIsRefreshing(false));
    }
  }, [dispatch, refetch]);

  // Memoizar datos derivados para optimizar renders
  const userStats = useMemo(() => ({
    total: users.length,
  }), [users.length]);

  return {
    users: users,
    isLoading,
    isError,
    isRefreshing,
    userStats,
    actions: {
      onSelectUser: handleSelectUser,
      onRefresh: handleRefresh,
    },
  };
}; 