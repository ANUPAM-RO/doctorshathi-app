import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: [
    {
      id: 'ORD-1001',
      date: '2026-02-26',
      totalAmount: 215,
      status: 'Delivered',
      items: [],
    },
    {
      id: 'ORD-1002',
      date: '2026-03-01',
      totalAmount: 95,
      status: 'Pending',
      items: [],
    },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
