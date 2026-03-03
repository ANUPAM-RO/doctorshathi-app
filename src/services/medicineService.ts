import { apiClient } from './apiClient';

export const medicineService = {
  list: () => apiClient.get('/medicines'),
  details: (id: string) => apiClient.get(`/medicines/${id}`),
  uploadPrescription: (medicineId: string, uri: string) => {
    const formData = new FormData();
    formData.append('medicineId', medicineId);
    formData.append('prescription', {
      uri,
      name: 'prescription.jpg',
      type: 'image/jpeg',
    } as never);
    return apiClient.post('/prescriptions/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
