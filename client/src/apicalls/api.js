import axiosInstance, { axiosBaseQuery } from '.';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category', 'User', 'Exam'],
  endpoints: () => ({}),
});
