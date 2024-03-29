import axiosInstance from '.';

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post('/exams/add', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await axiosInstance.post('/exams/get-all-exams');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post('/exams/get-exam-by-id', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/exams/edit-exam-by-id',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/exams/delete-exam-by-id',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addQuestionToExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/exams/add-question-to-exam',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const editQuestionInExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/exams/edit-question-in-exam',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteQuestionInExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/exams/delete-question-in-exam',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
