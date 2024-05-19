import axios from 'axios';

/**
 * Create axios instance.
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Refresh new access token from refresh token if access token expire.
 * 
 * @returns - New access token.
 */
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

// Add a request interceptor.
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if token expired, it return 401 error.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;