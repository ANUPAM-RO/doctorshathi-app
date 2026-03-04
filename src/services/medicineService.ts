import { apiClient } from './apiClient';

export const medicineService = {
  list: (query?: string) => apiClient.get('/medicines', { params: query ? { q: query } : undefined }),
  details: (id: string) => apiClient.get(`/medicines/${id}`),
  smartSearch: (query: string) => apiClient.get('/medicines/smart-search', { params: { q: query } }),
  explainPrescription: (text: string) => apiClient.post('/medicines/ai/prescription-explain', { text }),
  checkInteractions: (medicines: string[], allergies: string[] = []) =>
    apiClient.post('/medicines/ai/check-interactions', { medicines, allergies }),
  createOrder: (payload: unknown) => apiClient.post('/medicines/orders', payload),
  trackOrder: (orderId: string, email: string) => apiClient.get('/medicines/orders/track', { params: { orderId, email } }),
};
