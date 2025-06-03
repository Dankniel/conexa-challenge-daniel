import { NewsData } from '../../../home/components/NewsCard/types';

export interface NewsDetailScreenPresentationalProps {
  news: NewsData;
  formattedDate: string;
  onGoBack: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  paddingTop: number;
  paddingBottom: number;
  statusBarBackgroundColor: string;
  statusBarStyle: 'dark-content' | 'light-content';
}

export interface NewsDetailScreenContainerProps {
  route: {
    params: {
      news: NewsData;
    };
  };
} 