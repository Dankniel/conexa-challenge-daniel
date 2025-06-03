import { NewsData } from '../../components/NewsCard/types';

export interface HomeScreenPresentationalProps {
  text: string;
  news: NewsData[];
  onNewsPress: (news: NewsData) => void;
  onNavigateToFavorites: () => void;
  isLoading?: boolean;
  hasError?: boolean;
} 