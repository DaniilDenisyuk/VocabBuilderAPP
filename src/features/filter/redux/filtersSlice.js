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
    // Тип дієслова (true: irregular, false: regular, undefined: не вибрано)
    selectedVerbType: undefined,
    isIrregular: undefined,
    currentPage: 1,
    itemsPerPage: 7,
    keyword: '',
    category: '',
  },
  reducers: {
    //оновлює пошуковий запит
    setSearchQuery(state, action) {
      const trimmedQuery = action.payload.trim();
      state.searchQuery = trimmedQuery;
      state.keyword = trimmedQuery;
      // console.log('888 Updated Search Query:', state.searchQuery);
    },
    // оновлює обрану категорію
    setSelectedCategory(state, action) {
      const category = action.payload;
      state.selectedCategory = category;
      state.category = category;
      state.currentPage = 1;

      if (category !== 'verb') {
        state.selectedVerbType = undefined;
        state.isIrregular = undefined;
      }
      // console.log('666 Updated Category:', state.selectedCategory);
    },
    //оновлює обраний тип дієслова
    setSelectedVerbType(state, action) {
      if (state.selectedCategory === 'verb') {
        state.selectedVerbType = action.payload;
        state.isIrregular = action.payload;
      }
      // console.log('777 Updated Verb Type:', state.isIrregular);
    },
    setCurrentPage(state, action) {
      state.currentPage = Math.max(1, action.payload);
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSelectedVerbType,
  setCurrentPage,
  setItemsPerPage,
} = filtersSlice.actions;

export const selectFilters = state => state.filters;
export const selectCategories = state => state.filters.categories;
export const selectSearchQuery = state => state.filters.searchQuery;
export const selectSelectedCategory = state => state.filters.selectedCategory;
export const selectSelectedVerbType = state => state.filters.selectedVerbType;

//!pagination
export const selectCurrentPage = state => state.filters.currentPage;
export const selectItemsPerPage = state => state.filters.itemsPerPage;
export const selectKeyword = state => state.filters.keyword;
export const selectCategory = state => state.filters.category;
export const selectIsIrregular = state => state.filters.isIrregular;

export const selectFilteredWords = createSelector(
  [selectWords, selectFilters],
  (words = {}, { searchQuery, selectedCategory, isIrregular }) => {
    // console.log('Words:', words);
    // console.log('Search Query:', searchQuery);
    // console.log('Selected Category:', selectedCategory);
    // console.log('Selected Verb Type:', isIrregular);

    const results = words.results || [];

    return results.filter(word => {
      const matchesQuery =
        word.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.ua.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || word.category === selectedCategory;
      const matchesVerbType = isIrregular === null || word.isIrregular === isIrregular;

      return matchesQuery && matchesCategory && matchesVerbType;
    });
  }
);

export default filtersSlice.reducer;
