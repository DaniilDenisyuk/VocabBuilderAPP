// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
