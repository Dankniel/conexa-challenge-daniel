import { User } from '../../../../types/user';

export interface UsersScreenPresentationalProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onSelectUser: (user: User) => void;
  paddingTop: number;
} 