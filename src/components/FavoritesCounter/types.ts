export interface FavoritesCounterPresentationalProps {
  countText: string;
  onPress?: () => void;
}

export interface FavoritesCounterContainerProps {
  onPress?: () => void;
  showZero?: boolean;
} 