// import styles from './index.module.scss';
import { CiSearch } from 'react-icons/ci';
import styles from './index.module.scss';

const SearchInput = ({ value, onChange }) => {
  const handleChange = e => {
    console.log('Search input value:', e.target.value);
    onChange(e);
  };
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search words..."
        value={value}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <CiSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchInput;
