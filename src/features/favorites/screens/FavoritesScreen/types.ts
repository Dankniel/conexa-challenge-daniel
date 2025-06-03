import { NewsData } from '../../../home/components/NewsCard/types';

export interface FavoritesScreenPresentationalProps {
  favoriteNews: NewsData[];
  isLoading: boolean;
  onGoBack: () => void;
  onNewsPress: (news: NewsData) => void;
  paddingTop: number;
  paddingBottom: number;
  contentPaddingBottom: number;
  statusBarBackgroundColor: string;
  statusBarStyle: 'default' | 'light-content' | 'dark-content';
} 