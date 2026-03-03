import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Medicine } from '../../types';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Medicine>) => {
      const found = state.items.find((item) => item.medicine.id === action.payload.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.items.push({ medicine: action.payload, quantity: 1 });
      }
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const found = state.items.find((item) => item.medicine.id === action.payload);
      if (found) found.quantity += 1;
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const found = state.items.find((item) => item.medicine.id === action.payload);
      if (!found) return;
      if (found.quantity > 1) {
        found.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.medicine.id !== action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.medicine.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
