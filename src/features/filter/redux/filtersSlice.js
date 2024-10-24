import { createSlice } from '@reduxjs/toolkit';
import fetchCategories from '../../category/redux/categoriesOperations';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    searchQuery: '',
    selectedCategory: '',
    selectedVerbType: 'Regular',
  },
  reducers: {
    // оновлює обрану категорію
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    //оновлює пошуковий запит
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    //оновлює обраний тип дієслова
    setSelectedVerbType(state, action) {
      state.selectedVerbType = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setSelectedCategory, setSearchQuery, setSelectedVerbType } = filtersSlice.actions;

export const selectFilters = state => state.filters;
export const selectCategories = state => state.filters.categories; // Для отримання категорій

export const selectSearchQuery = state => state.filters.searchQuery;
export const selectSelectedCategory = state => state.filters.selectedCategory;
export const selectSelectedVerbType = state => state.filters.selectedVerbType;

export default filtersSlice.reducer;
