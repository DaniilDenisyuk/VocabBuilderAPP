import classNames from 'classnames';
import styles from './index.module.scss';
import { CiSearch } from 'react-icons/ci';
import CategoriesSelector from '../../../category/components';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  selectSearchQuery,
  selectSelectedCategory,
  selectSelectedVerbType,
  setSearchQuery,
  setSelectedCategory,
  setSelectedVerbType,
} from '../../redux/filtersSlice';

export default function Filters() {
  const dispatch = useDispatch();

  //отримати значення з глобального стану Redux
  const searchQuery = useSelector(selectSearchQuery);
  console.log('searchQuery з Redux:', searchQuery);
  //отримати вибрану категорію з Redux
  const selectedCategory = useSelector(selectSelectedCategory);

  //локальний стан для зберігання значення, яке вводиться в інпут
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  //для вибору типу дієслова
  const selectedVerbType = useSelector(selectSelectedVerbType);

  //оновити пошуковий запит у redux = синхронізувати локальний стан із глобальним
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  //реагує на зміну значення в інпуті
  const handleSearchChange = e => {
    //отримує нове значення з події (e.target.value)
    const query = e.target.value;
    //оновлює локальний стан
    setLocalSearchQuery(query);
    //відправляє новий пошуковий запит у глобальний стан через Redux
    dispatch(setSearchQuery(query));
  };
  //відправляєвибрану категорію в Redux, оновлює глобальний стан
  const handleCategoryChange = e => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleVerbTypeChange = useCallback(
    e => dispatch(setSelectedVerbType(e.target.value)),
    [dispatch]
  );

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search words..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <CiSearch className={styles.searchIcon} />
      </div>

      <CategoriesSelector selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      {selectedCategory === 'Verb' && (
        <VerbTypeSwitch
          className={classNames(styles.radioBtnContainer)}
          selectedVerbType={selectedVerbType}
          onChange={handleVerbTypeChange}
          selectStyleName="dashboard"
        />
      )}
    </div>
  );
}
