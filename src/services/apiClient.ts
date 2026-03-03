import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example-pharmacy.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data?.message ?? 'Something went wrong')
);
