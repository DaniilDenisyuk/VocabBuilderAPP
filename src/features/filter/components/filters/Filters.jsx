import classNames from 'classnames';
import styles from './index.module.scss';
import SearchInput from '../searchInput/SearchInput';
import CategoriesSelector from '../../../category/components';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';
import { useCategory } from '../../../category/components/CategoryProvider';

export default function Filters({
  selectedCategory,
  selectedVerbType,
  handleCategoryChange,
  handleVerbTypeChange,
  searchQuery,
  setSearchQuery,
}) {
  const { categories } = useCategory();
  return (
    <div className={styles.filterContainer}>
      <SearchInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {categories.length > 0 ? (
        <CategoriesSelector categories={categories} onChange={handleCategoryChange} />
      ) : (
        <p>No categories available</p>
      )}
      {selectedCategory === 'Verb' && (
        <VerbTypeSwitch
          selectedVerbType={selectedVerbType}
          onChange={handleVerbTypeChange}
          className={classNames(styles.radioBtnContainer)}
          selectStyleName="dashboard"
        />
      )}
    </div>
  );
}
