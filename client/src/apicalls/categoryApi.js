import { api } from './api';

const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({ url: '/api/category/get-all-categories', method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id: id }) => ({ type: 'Category', id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    addCategory: build.mutation({
      query(body) {
        return {
          url: `/api/category/add`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { _id: id }) => [
        { type: 'Category', id },
      ],
    }),
    getCategory: build.query({
      query: (body) => ({
        url: `/api/category/get-category-by-id`,
        method: 'POST',
        data: body,
      }),
      providesTags: (result, error, { categoryId: id }) => [
        { type: 'Category', id },
      ],
    }),
    updateCategory: build.mutation({
      query(body) {
        return {
          url: `/api/category/edit-category-by-id`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { categoryId: id }) => [
        { type: 'Category', id },
      ],
    }),
    deleteCategory: build.mutation({
      query(body) {
        return {
          url: `/api/category/delete-category-by-id`,
          method: 'POST',
          data: body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, { categoryId: id }) => [
        { type: 'Category', id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
