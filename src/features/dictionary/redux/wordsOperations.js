import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { apiSlice } from '../../../infrastructure/api/redux/apiSlice';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(apiSlice.endpoints.getWordsAll.initiate());
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWord = createAsyncThunk(
  'words/addWord',
  async (wordData, { dispatch, rejectWithValue }) => {
    try {
      const newIdWord = { ...wordData, id: uuidv4(), progress: 0 };
      const result = await dispatch(apiSlice.endpoints.createWord.initiate(newIdWord));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWord = createAsyncThunk(
  'words/updateWord',
  async (wordData, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(apiSlice.endpoints.editWord.initiate(wordData));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (wordId, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(apiSlice.endpoints.deleteWord.initiate(wordId));
      return wordId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        const index = state.items.findIndex(word => word.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.items = state.items.filter(word => word.id !== action.payload);
      });
  },
});

export default wordsSlice.reducer;
