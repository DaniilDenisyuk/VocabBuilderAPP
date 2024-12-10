import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../../api/redux/apiSlice';

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
  const result = await apiSlice.endpoints.getSubjects.initiate();
  return result.data;
});
const initialState = {
  subjects: [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
    { id: 4, name: 'English' },
    { id: 5, name: 'Geography' },
    { id: 6, name: 'Art' },
    { id: 7, name: 'Physical Education' },
    { id: 8, name: 'Music' },
    { id: 9, name: 'Literature' },
    { id: 10, name: 'Chemistry' },
  ],
};
const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
    },
  },
});

export const { setSubjects, addSubject, removeSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
