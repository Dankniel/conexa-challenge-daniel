import { JsonPlaceholderPost } from '../store/api';
import { NewsData } from '../features/home/components/NewsCard/types';

export const transformPostToNewsData = (post: JsonPlaceholderPost): NewsData => {
  return {
    id: post.id.toString(),
    title: post.title,
    description: post.content,
    imageUrl: post.image || post.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
    publishedAt: post.publishedAt,
    source: 'JSONPlaceholder',
    category: post.category || 'General',
  };
};

export const transformPostsToNewsData = (posts: JsonPlaceholderPost[]): NewsData[] => {
  return posts.map(transformPostToNewsData);
}; 