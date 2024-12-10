import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [
    { id: 1, name: 'Teacher1' },
    { id: 2, name: 'Teacher2' },
    { id: 3, name: 'Teacher3' },
    { id: 4, name: 'Teacher4' },
    { id: 5, name: 'Teacher5' },
    { id: 6, name: 'Teacher6' },
    { id: 7, name: 'Teacher7' },
    { id: 8, name: 'Teacher8' },
    { id: 9, name: 'Teacher9' },
    { id: 10, name: 'Teacher10' },
  ],
};
const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    removeTeacher: (state, action) => {
      state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
    },
  },
});
export const { setTeachers, addTeacher, removeTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
