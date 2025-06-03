import { baseApi } from './baseApi';

// Tipos para los datos de JSONPlaceholder
export interface JsonPlaceholderPost {
  id: number;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<JsonPlaceholderPost[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    getPostById: builder.query<JsonPlaceholderPost, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi; 