import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  const debugHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost;
  const host = typeof debugHost === 'string' ? debugHost.split(':')[0] : null;

  if (host) {
    return `http://${host}:4000`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }

  return 'http://localhost:4000';
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (!token) {
    delete apiClient.defaults.headers.common.Authorization;
    return;
  }

  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === 'ERR_NETWORK') {
      return Promise.reject(
        `Cannot reach backend at ${apiClient.defaults.baseURL}. Make sure backend is running on port 4000 and phone/emulator is on same network.`
      );
    }

    const message =
      typeof error?.response?.data?.message === 'string'
        ? error.response.data.message
        : 'Something went wrong';
    return Promise.reject(message);
  }
);
