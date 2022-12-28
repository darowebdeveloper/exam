import axiosInstance from '.';

export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/reports/add-report',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReports = async () => {
  try {
    const response = await axiosInstance.post('/api/reports/add-all-reports');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllReportsByUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/reports/get-all-reports-by-user',
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
