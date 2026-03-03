import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Medicine } from '../../types';

type ProductsState = {
  medicines: Medicine[];
  featured: string[];
  loading: boolean;
};

const initialState: ProductsState = {
  loading: false,
  featured: ['1', '2', '4'],
  medicines: [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      price: 45,
      description: 'Pain and fever relief tablet.',
      stock: 72,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
      category: 'Pain Relief',
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      price: 120,
      description: 'Antibiotic for bacterial infections.',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de',
      category: 'Antibiotics',
      requiresPrescription: true,
    },
    {
      id: '3',
      name: 'Vitamin C Tablets',
      price: 80,
      description: 'Immunity support supplement.',
      stock: 110,
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2',
      category: 'Supplements',
    },
    {
      id: '4',
      name: 'Cough Syrup',
      price: 95,
      description: 'Relieves dry and wet cough.',
      stock: 55,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
      category: 'Cold & Flu',
      requiresPrescription: false,
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setMedicines: (state, action: PayloadAction<Medicine[]>) => {
      state.medicines = action.payload;
    },
  },
});

export const { setMedicines } = productsSlice.actions;
export default productsSlice.reducer;
