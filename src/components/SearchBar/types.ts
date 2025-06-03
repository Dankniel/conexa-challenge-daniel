export interface SearchBarPresentationalProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder: string;
  showClearButton: boolean;
}

export interface SearchBarContainerProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
} 