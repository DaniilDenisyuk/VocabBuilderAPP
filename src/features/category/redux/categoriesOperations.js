import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/words/categories');
      console.log('API response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server Error: ${errorText}`);

        throw new Error(`Server Error: ${errorText}`);
      }
      const data = await response.json();
      console.log('Parsed data:', data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default fetchCategories;
