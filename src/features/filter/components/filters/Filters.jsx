//Filters.jsx
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import {
  selectSearchQuery,
  selectSelectedCategory,
  selectSelectedVerbType,
  setSearchQuery,
  setSelectedCategory,
  setSelectedVerbType,
} from '../../redux/filtersSlice';
import styles from './index.module.scss';
import { debounce } from 'lodash-es';
import CategoriesSelector from '../../../category/components';

export default function Filters({ onCategoryChange }) {
  const dispatch = useDispatch();

  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedVerbType = useSelector(selectSelectedVerbType);

  const handleSearchChange = useCallback(
    debounce(query => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const handleInputChange = e => {
    const query = e.target.value;
    handleSearchChange(query);
  };

  const handleFilterChange = (category, verbType) => {
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedVerbType(verbType || ''));
    onCategoryChange(category);
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
      <CategoriesSelector
        selectedCategory={selectedCategory}
        selectedVerbType={selectedVerbType}
        onCategoryChange={category => handleFilterChange(category || '')}
        onVerbTypeChange={verbType => handleFilterChange(selectedCategory, verbType)}
        className={styles.selector}
        variant="dashboard"
      />
    </div>
  );
}
