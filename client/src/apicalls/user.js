const { default: axiosInstance } = require('.');

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/users/register', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/users/login', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post('/users/get-user-info');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
