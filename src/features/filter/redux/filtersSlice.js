//filterSlice.js
import { createSelector, createSlice } from '@reduxjs/toolkit';
import fetchCategories from '../../category/redux/categoriesOperations';
import { selectWords } from '../../dictionary/redux/wordsSlice';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    searchQuery: '',
    selectedCategory: '',
    selectedVerbType: '',
  },
  reducers: {
    // оновлює обрану категорію
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      console.log('Updated Category:', state.selectedCategory);
    },
    //оновлює пошуковий запит
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      console.log('Updated Search Query:', state.searchQuery);
    },
    //оновлює обраний тип дієслова
    setSelectedVerbType(state, action) {
      state.selectedVerbType = action.payload;
      console.log('Updated Verb Type:', state.selectedVerbType);
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
export const selectCategories = state => state.filters.categories;
export const selectSearchQuery = state => state.filters.searchQuery;
export const selectSelectedCategory = state => state.filters.selectedCategory;
export const selectSelectedVerbType = state => state.filters.selectedVerbType;

export const selectFilteredWords = createSelector(
  [selectWords, selectFilters],
  (words = {}, { searchQuery, selectedCategory, selectedVerbType }) => {
    console.log('Words:', words);
    console.log('Search Query:', searchQuery);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Verb Type:', selectedVerbType);

    const results = words.results || [];

    return results.filter(word => {
      const matchesQuery =
        word.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.ua.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || word.category === selectedCategory;
      const matchesVerbType =
        !selectedVerbType ||
        (selectedVerbType === 'Regular' ? !word.isIrregular : word.isIrregular);

      return matchesQuery && matchesCategory && matchesVerbType;
    });
  }
);

export default filtersSlice.reducer;
