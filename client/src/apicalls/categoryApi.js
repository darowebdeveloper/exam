import { api } from './api';

const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: ({ pagination: { current = null, pageSize = null } = {} }) => ({
        url: '/api/category/get-all-categories',
        method: 'GET',
        params: { current, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id: id }) => ({ type: 'Category', id })),
              { type: 'Category', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Category', id: 'PARTIAL-LIST' }],
    }),
    addCategory: build.mutation({
      query(body) {
        return {
          url: `/api/category/add`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error) => [
        { type: 'Category', id: result?.data?._id },
      ],
    }),
    getCategory: build.mutation({
      query: (body) => ({
        url: `/api/category/get-category-by-id`,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: (result, error, { categoryId: id }) => [
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
      invalidatesTags: (result, error, { categoryId: id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'PARTIAL-LIST' },
      ],
    }),
    searchCategory: build.query({
      query(body) {
        return {
          url: `/api/category/search-category`,
          method: 'POST',
          data: body,
        };
      },
      providesTags: (result, error, { categoryId: id }) => [
        { type: 'Category', id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSearchCategoryQuery,
} = categoryApi;
