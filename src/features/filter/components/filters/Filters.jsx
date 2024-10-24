import classNames from 'classnames';
import styles from './index.module.scss';
import SearchInput from '../searchInput/SearchInput';
import CategoriesSelector from '../../../category/components';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';

export default function Filters({
  selectedCategory,
  selectedVerbType,
  handleCategoryChange,
  handleVerbTypeChange,
  categories,
  searchValue,
  setSearchValue,
}) {
  return (
    <div className={styles.filterContainer}>
      <SearchInput value={searchValue} onChange={e => setSearchValue(e)} />
      {categories && (
        <CategoriesSelector
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
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
