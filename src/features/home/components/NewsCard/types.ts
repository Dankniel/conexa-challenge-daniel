export interface NewsData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

export interface NewsCardPresentationalProps {
  news: NewsData;
  onPress?: (news: NewsData) => void;
}

export interface NewsCardContainerProps {
  news: NewsData;
  onPress?: (news: NewsData) => void;
} 