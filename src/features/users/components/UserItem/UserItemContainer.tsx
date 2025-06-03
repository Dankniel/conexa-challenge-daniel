import React, { useCallback, useMemo } from 'react';
import { UserItemContainerProps } from './types';
import UserItemPresentational from './UserItemPresentational';

const UserItemContainer = ({ user, onPress }: UserItemContainerProps) => {
  // Lógica de negocio: formatear el nombre completo
  const fullName = useMemo(() => {
    return `${user.firstname} ${user.lastname}`;
  }, [user.firstname, user.lastname]);

  // Callback memoizado para optimizar renders
  const handlePress = useCallback(() => {
    onPress(user);
  }, [onPress, user]);

  return (
    <UserItemPresentational
      user={user}
      fullName={fullName}
      onPress={handlePress}
    />
  );
};

export default UserItemContainer; 