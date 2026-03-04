import { apiClient } from './apiClient';

export const discoveryService = {
  hospitals: () => apiClient.get('/hospitals'),
  doctors: () => apiClient.get('/doctors'),
  availability: () => apiClient.get('/availability'),
  search: (params: {
    q?: string;
    day?: string;
    doctor?: string;
    department?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get('/search', { params }),
};
