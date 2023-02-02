import { api } from './api';

const examApi = api.injectEndpoints({
  endpoints: (build) => ({
    addExam: build.mutation({
      query(body) {
        return {
          url: `/exams/add`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error) => {
        return [
          { type: 'Exam', id: result?.data?._id },
          { type: 'Exam', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getExamsInCategory: build.query({
      query: (body) => ({
        url: '/exams/get-all-exams-in-category',
        method: 'POST',
        data: body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id: id }) => ({ type: 'Exam', id })),
              { type: 'Exam', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Exam', id: 'PARTIAL-LIST' }],
    }),
    getExam: build.query({
      query: (body) => ({
        url: `/exams/get-exam-by-id`,
        method: 'POST',
        data: body,
      }),
      providesTags: (result, error, { examId: id }) => {
        return [{ type: 'Exam', id }];
      },
    }),
    updateExam: build.mutation({
      query(body) {
        return {
          url: `/exams/edit-exam-by-id`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { examId: id }) => [
        { type: 'Exam', id },
      ],
    }),
    deleteExam: build.mutation({
      query(body) {
        return {
          url: `/exams/delete-exam-by-id`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { examId: id }) => [
        { type: 'Exam', id },
        { type: 'Exam', id: 'PARTIAL-LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExamsInCategoryQuery,
  useAddExamMutation,
  useGetExamQuery,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examApi;
