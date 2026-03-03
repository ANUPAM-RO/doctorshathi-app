import { apiClient } from './apiClient';

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = LoginPayload & {
  name: string;
};

export const authService = {
  login: (payload: LoginPayload) => apiClient.post('/auth/login', payload),
  signup: (payload: SignupPayload) => apiClient.post('/auth/signup', payload),
  forgotPassword: (email: string) => apiClient.post('/auth/forgot-password', { email }),
};
