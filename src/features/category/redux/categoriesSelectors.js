import { createSelector } from 'reselect';

const selectCategoriesState = state => state.categories || {};
const selectWordsState = state => state.words || {};

export const selectCategories = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.categories
);

export const selectCategoriesStatus = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.status
);

export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  categoriesState => categoriesState.error
);

export const selectWordCategories = createSelector(
  [selectWordsState],
  wordsState => wordsState.categories
);
