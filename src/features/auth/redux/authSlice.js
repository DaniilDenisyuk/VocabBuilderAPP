import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuthenticated, setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
