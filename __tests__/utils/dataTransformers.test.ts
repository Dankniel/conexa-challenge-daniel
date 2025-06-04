import {
  transformPostToNewsData,
  transformPostsToNewsData,
} from '../../src/utils/dataTransformers';
import { JsonPlaceholderPost } from '../../src/store/api/postsApi';
import { NewsData } from '../../src/features/home/components/NewsCard/types';

describe('dataTransformers', () => {
  describe('transformPostToNewsData', () => {
    const mockPost: JsonPlaceholderPost = {
      id: 1,
      title: 'Test Title',
      content: 'Test content body.',
      image: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumbnail.jpg',
      status: 'published',
      category: 'Technology',
      publishedAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-02T12:00:00Z',
      userId: 101,
    };

    it('debería transformar correctamente un JsonPlaceholderPost a NewsData', () => {
      const expectedNewsData: NewsData = {
        id: '1',
        title: 'Test Title',
        description: 'Test content body.',
        imageUrl: 'https://example.com/image.jpg',
        publishedAt: '2024-01-01T12:00:00Z',
        source: 'JSONPlaceholder',
        category: 'Technology',
      };
      const result = transformPostToNewsData(mockPost);
      expect(result).toEqual(expectedNewsData);
    });

    it('debería usar la URL de imagen de thumbnail si image no está disponible', () => {
      const postWithoutImage: JsonPlaceholderPost = {
        ...mockPost,
        image: '', // Simula imagen vacía
      };
      const result = transformPostToNewsData(postWithoutImage);
      expect(result.imageUrl).toBe(mockPost.thumbnail);
    });

    it('debería usar la URL de imagen de fallback si image y thumbnail no están disponibles', () => {
      const postWithoutAnyImage: JsonPlaceholderPost = {
        ...mockPost,
        image: '',
        thumbnail: '',
      };
      const result = transformPostToNewsData(postWithoutAnyImage);
      expect(result.imageUrl).toBe('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop');
    });

    it('debería usar la categoría por defecto si no se proporciona', () => {
      const postWithoutCategory: JsonPlaceholderPost = {
        ...mockPost,
        category: '', // Simula categoría vacía
      };
      const result = transformPostToNewsData(postWithoutCategory);
      expect(result.category).toBe('General');
    });
  });

  describe('transformPostsToNewsData', () => {
    const mockPostsArray: JsonPlaceholderPost[] = [
      {
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
        image: 'img1.jpg',
        thumbnail: 'thumb1.jpg',
        status: 'published',
        category: 'Cat1',
        publishedAt: '2024-01-01Z',
        updatedAt: '2024-01-01Z',
        userId: 1,
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'Content 2',
        image: 'img2.jpg',
        thumbnail: 'thumb2.jpg',
        status: 'draft',
        category: 'Cat2',
        publishedAt: '2024-01-02Z',
        updatedAt: '2024-01-02Z',
        userId: 2,
      },
    ];

    it('debería transformar un array de JsonPlaceholderPost a un array de NewsData', () => {
      const result = transformPostsToNewsData(mockPostsArray);
      expect(result.length).toBe(mockPostsArray.length);
      expect(result[0].id).toBe(mockPostsArray[0].id.toString());
      expect(result[0].title).toBe(mockPostsArray[0].title);
      expect(result[1].id).toBe(mockPostsArray[1].id.toString());
      expect(result[1].description).toBe(mockPostsArray[1].content);
    });

    it('debería retornar un array vacío si el input es un array vacío', () => {
      const result = transformPostsToNewsData([]);
      expect(result).toEqual([]);
    });
  });
}); 