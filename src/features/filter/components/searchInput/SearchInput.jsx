// import styles from './index.module.scss';
import { CiSearch } from 'react-icons/ci';
import styles from './index.module.scss';

const SearchInput = ({ onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search words..."
        onChange={onChange}
        className={styles.searchInput}
      />
      <CiSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchInput;
