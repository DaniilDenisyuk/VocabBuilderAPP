import { createSlice } from '@reduxjs/toolkit';
import { addWord, deleteWord, fetchWords, updateWord } from './wordsOperations';

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
    filterWords: (state, action) => {
      state.filteredWords = state.words.filter(
        word => word.en.includes(action.payload) || word.ua.includes(action.payload)
      );
    },
  },
  extraReducers: builder => {
    const handlePending = state => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(fetchWords.pending, handlePending)
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchWords.rejected, handleRejected)

      .addCase(addWord.pending, handlePending)
      .addCase(addWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
        state.loading = false;
      })
      .addCase(addWord.rejected, handleRejected)

      .addCase(updateWord.pending, handlePending)
      .addCase(updateWord.fulfilled, (state, action) => {
        const index = state.words.findIndex(word => word.id === action.payload.id);
        if (index !== -1) {
          state.words[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWord.rejected, handleRejected)

      .addCase(deleteWord.pending, handlePending)
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.words = state.words.filter(word => word.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWord.rejected, handleRejected);
  },
});

export const { setWords, filterWords } = wordsSlice.actions;

export default wordsSlice.reducer;

export const selectWords = state => state.words.words;
export const selectLoading = state => state.words.loading;
export const selectError = state => state.words.error;
// export const selectFilteredWords = state => state.words.filteredWords;
export const selectFilteredWords = (state, filter) => {
  return state.words.words.filter(
    word =>
      word.en.toLowerCase().includes(filter.toLowerCase()) ||
      word.ua.toLowerCase().includes(filter.toLowerCase())
  );
};
