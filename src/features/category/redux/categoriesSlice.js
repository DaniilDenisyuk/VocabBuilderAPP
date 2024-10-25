import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../../../../data.json';
import localAPI from '../../../infrastructure/api/localAPI';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const categories = await localAPI.getCategories();
  return categories;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    words: data,
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        // console.log('Categories loaded successfully:', action.payload);

        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
