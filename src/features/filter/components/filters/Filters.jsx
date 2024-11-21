// Filters.jsx
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import {
  selectFilters,
  selectSearchQuery,
  setSearchQuery,
  setSelectedCategory,
  setSelectedVerbType,
} from '../../redux/filtersSlice';
import styles from './index.module.scss';
import { debounce } from 'lodash-es';
import CategoryAndVerbTypeSelector from '../../../category/components';

export default function Filters() {
  const dispatch = useDispatch();
  const { selectedCategory, selectedVerbType } = useSelector(selectFilters);
  const searchQuery = useSelector(selectSearchQuery);

  const handleSearchChange = useCallback(
    debounce(query => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const handleInputChange = e => {
    const query = e.target.value.trim();
    handleSearchChange(query);
  };

  const handleCategoryChange = category => {
    dispatch(setSelectedCategory(category));
    if (category !== 'verb') {
      dispatch(setSelectedVerbType(undefined));
    }
  };

  const handleVerbTypeChange = verbType => {
    dispatch(setSelectedVerbType(verbType));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search words..."
          value={searchQuery}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <CiSearch className={styles.searchIcon} />
      </div>
      <CategoryAndVerbTypeSelector
        className={styles.selector}
        selectedCategory={selectedCategory}
        isIrregular={selectedVerbType}
        onCategoryChange={handleCategoryChange}
        onVerbTypeChange={handleVerbTypeChange}
        variant="dashboard"
      />
    </div>
  );
}
