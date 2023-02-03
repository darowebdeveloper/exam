import axiosInstance from '.';

export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post('/reports/add-report', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReports = async (filters) => {
  try {
    const response = await axiosInstance.post(
      '/reports/get-all-reports',
      filters,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReportsByUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/reports/get-all-reports-by-user',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
