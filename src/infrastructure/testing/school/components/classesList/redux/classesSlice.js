import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
    { id: 1, name: '1-A' },
    { id: 2, name: '1-Б' },
    { id: 3, name: '2-A' },
    { id: 4, name: '2-Б' },
    { id: 5, name: '3-A' },
    { id: 6, name: '3-Б' },
    { id: 7, name: '4-А' },
    { id: 8, name: '4-Б' },
    { id: 9, name: '5-А' },
    { id: 10, name: '5-Б' },
  ],
};
const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.pupils = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter(cl => cl.id !== action.payload);
    },
  },
});
export const { setClasses, addClass, removeClass } = classSlice.actions;

export default classSlice.reducer;
