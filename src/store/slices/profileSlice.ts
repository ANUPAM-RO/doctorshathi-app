import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

type ProfileState = {
  user: User;
};

const initialState: ProfileState = {
  user: {
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    address: '12 Park Street, Kolkata',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
