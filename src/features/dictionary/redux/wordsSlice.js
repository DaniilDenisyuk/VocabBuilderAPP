import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  words: [],
  loading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWords, setLoading, setError } = wordsSlice.actions;

export default wordsSlice.reducer;

export const selectWords = state => state.words.words;
export const selectLoading = state => state.words.loading;
export const selectError = state => state.words.error;
