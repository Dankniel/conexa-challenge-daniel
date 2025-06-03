import { User } from '../../../../types/user';

export interface UserItemContainerProps {
  user: User;
  onPress: (user: User) => void;
}

export interface UserItemPresentationalProps {
  user: User;
  fullName: string;
  onPress: () => void;
} 