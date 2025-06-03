import React, { useCallback } from 'react';
import SearchBarPresentational from './SearchBarPresentational';
import { SearchBarContainerProps } from './types';
import { usePosts } from '../../features/home/hooks/usePosts';

const SearchBarContainer = ({ 
  placeholder = "Buscar noticias...",
  onSearch,
  onClear 
}: SearchBarContainerProps) => {
  const { searchQuery, handleSearch, handleClearSearch } = usePosts();

  // Lógica: decidir si mostrar el botón de limpiar
  const showClearButton = searchQuery.length > 0;

  const handleChangeText = useCallback((text: string) => {
    handleSearch(text);
    onSearch?.(text);
  }, [handleSearch, onSearch]);

  const handleClear = useCallback(() => {
    handleClearSearch();
    onClear?.();
  }, [handleClearSearch, onClear]);

  return (
    <SearchBarPresentational
      value={searchQuery}
      onChangeText={handleChangeText}
      onClear={handleClear}
      placeholder={placeholder}
      showClearButton={showClearButton}
    />
  );
};

export default SearchBarContainer; 