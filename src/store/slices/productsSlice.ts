import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Medicine } from '../../types';
import { medicineService } from '../../services/medicineService';

type ProductsState = {
  medicines: Medicine[];
  featured: string[];
  loading: boolean;
  error: string | null;
};

type BackendMedicine = {
  _id: string;
  name: string;
  price?: number;
  description?: string;
  stock?: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  prescriptionRequired?: boolean;
};

const fallbackImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae';

const mapBackendMedicine = (item: BackendMedicine): Medicine => ({
  id: item._id,
  name: item.name,
  price: Number(item.price ?? 0),
  description: item.description || '',
  stock: Number(item.stock ?? 0),
  image: item.imageUrl || item.images?.[0] || fallbackImage,
  category: item.category || 'General',
  requiresPrescription: Boolean(item.prescriptionRequired),
});

export const fetchMedicines = createAsyncThunk<Medicine[], void, { rejectValue: string }>(
  'products/fetchMedicines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await medicineService.list();
      const data = Array.isArray(response.data) ? (response.data as BackendMedicine[]) : [];
      return data.map(mapBackendMedicine);
    } catch (error) {
      return rejectWithValue(typeof error === 'string' ? error : 'Failed to load medicines');
    }
  }
);

const initialState: ProductsState = {
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
        state.featured = action.payload.slice(0, 3).map((medicine) => medicine.id);
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load medicines';
      });
  },
});

export const { setMedicines } = productsSlice.actions;
export default productsSlice.reducer;
