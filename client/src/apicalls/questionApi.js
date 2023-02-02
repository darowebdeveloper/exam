import { api } from './api';

const questionApi = api.injectEndpoints({
  endpoints: (build) => ({
    addQuestion: build.mutation({
      query(body) {
        return {
          url: `/exams/questions/add-question-to-exam`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error) => {
        return [
          { type: 'Question', id: result?.data?._id },
          { type: 'Question', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getQuestionsInExam: build.query({
      query: (body) => ({
        url: '/exams/questions/get-questions-in-exam',
        method: 'POST',
        data: body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id: id }) => ({ type: 'Question', id })),
              { type: 'Question', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Question', id: 'PARTIAL-LIST' }],
    }),
    getQuestion: build.query({
      query: (body) => ({
        url: `/exams/questions/get-question-by-id`,
        method: 'POST',
        data: body,
      }),
      transformResponse: (response, meta, arg) => {
        return {
          ...response,
          data: {
            ...response.data,
            A: response.data.options?.A,
            B: response.data.options?.B,
            C: response.data.options?.C,
            D: response.data.options?.D,
          },
        };
      },
      providesTags: (result, error, { questionId: id }) => {
        return [{ type: 'Question', id }];
      },
    }),
    updateQuestion: build.mutation({
      query(body) {
        return {
          url: `/exams/questions/edit-question-by-id`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { questionId: id }) => [
        { type: 'Question', id },
      ],
    }),
    deleteQuestion: build.mutation({
      query(body) {
        return {
          url: `/exams/questions/delete-question-in-exam`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: (result, error, { questionId: id }) => [
        { type: 'Question', id },
        { type: 'Question', id: 'PARTIAL-LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuestionsInExamQuery,
  useAddQuestionMutation,
  useGetQuestionQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
