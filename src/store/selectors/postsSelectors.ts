import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { JsonPlaceholderPost } from '../api/postsApi';

// Selectores básicos
export const selectPostsState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectFilteredPosts = (state: RootState) => state.posts.filteredPosts;
export const selectFavoriteIds = (state: RootState) => state.posts.favoriteIds;
export const selectSearchQuery = (state: RootState) => state.posts.searchQuery;
export const selectIsLoadingFavorites = (state: RootState) => state.posts.isLoadingFavorites;

// Selectores memoizados con createSelector
export const selectFavoritePosts = createSelector(
  [selectPosts, selectFavoriteIds],
  (posts: JsonPlaceholderPost[], favoriteIds: string[]) => {
    return posts.filter(post => favoriteIds.includes(post.id.toString()));
  }
);

export const selectIsPostFavorite = createSelector(
  [selectFavoriteIds, (state: RootState, postId: string) => postId],
  (favoriteIds: string[], postId: string) => {
    return favoriteIds.includes(postId);
  }
);

export const selectFavoritesCount = createSelector(
  [selectFavoriteIds],
  (favoriteIds: string[]) => favoriteIds.length
);

export const selectHasSearchQuery = createSelector(
  [selectSearchQuery],
  (searchQuery: string) => searchQuery.trim().length > 0
);

export const selectPostsToDisplay = createSelector(
  [selectHasSearchQuery, selectFilteredPosts, selectPosts],
  (hasSearch: boolean, filteredPosts: JsonPlaceholderPost[], allPosts: JsonPlaceholderPost[]) => {
    return hasSearch ? filteredPosts : allPosts;
  }
); 