import React, { useCallback } from 'react';
import SearchBarPresentational from './SearchBarPresentational';
import { SearchBarContainerProps } from './types';
import { usePosts } from '../../features/home/hooks/usePosts';
import { useI18n } from '../../i18n';

const SearchBarContainer = ({ 
  placeholder,
  onSearch,
  onClear 
}: SearchBarContainerProps) => {
  const { searchQuery, handleSearch, handleClearSearch } = usePosts();
  const { t } = useI18n();

  // Usar traducción como placeholder por defecto si no se proporciona uno
  const defaultPlaceholder = placeholder || t('home.searchPlaceholder');

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
      placeholder={defaultPlaceholder}
      showClearButton={showClearButton}
    />
  );
};

export default SearchBarContainer; 