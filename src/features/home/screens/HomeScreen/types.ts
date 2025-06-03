import { NewsData } from '../../components/NewsCard/types';

export interface HomeScreenPresentationalProps {
  text: string;
  news: NewsData[];
  onNewsPress: (news: NewsData) => void;
  onNavigateToFavorites: () => void;
  isLoading?: boolean;
  hasError?: boolean;
  texts: {
    searchPlaceholder: string;
    loadingNews: string;
    errorLoadingNews: string;
    checkConnection: string;
    noNewsFound: string;
    tryOtherTerms: string;
  };
  layoutStyles: {
    paddingTop: number;
    paddingBottom: number;
    contentPaddingBottom: number;
  };
} 