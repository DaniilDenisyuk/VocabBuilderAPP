import classNames from 'classnames';
import styles from './index.module.scss';
import { CiSearch } from 'react-icons/ci';
import CategoriesSelector from '../../../category/components';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash-es';

export default function Filters({ onCategoryChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('navigate:', navigate);
  // console.log('location:', location);

  // const parsedQuery = queryString.parse(location.search);
  // // console.log('parsedQuery', parsedQuery);
  // const [localQuery, setLocalQuery] = useState({
  //   searchQuery: parsedQuery.searchQuery || '',
  //   category: parsedQuery.category || '',
  //   verbType: parsedQuery.verbType || '',
  // });

  const searchParams = new URLSearchParams(location.search);

  const getSearchParams = () => ({
    searchQuery: searchParams.get('searchQuery') || '',
    category: searchParams.get('category') || '',
    verbType: searchParams.get('verbType') || '',
  });

  const [localQuery, setLocalQuery] = useState(getSearchParams());

  const updQueryString = newParams => {
    Object.entries(newParams).forEach(([key, value]) => {
      value ? searchParams.set(key, value) : searchParams.delete(key);
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleSearchChange = useCallback(
    debounce(query => {
      updQueryString({ searchQuery: query });
    }, 300),
    []
  );

  const handleInputChange = e => {
    const query = e.target.value;
    setLocalQuery(prev => ({ ...prev, searchQuery: query }));
    handleSearchChange(query);
  };

  const handleCategoryChange = e => {
    const category = e.target.value;
    setLocalQuery(prev => ({ ...prev, category, verbType: '' }));
    updQueryString({ category, verbType: '' });

    onCategoryChange(category);
  };

  const handleVerbTypeChange = useCallback(e => {
    const verbType = e.target.value;
    setLocalQuery(prev => ({ ...prev, verbType }));
    updQueryString({ verbType });
  }, []);

  useEffect(() => {
    setLocalQuery(getSearchParams());
  }, [location.search]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search words..."
          value={localQuery.searchQuery}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <CiSearch className={styles.searchIcon} />
      </div>

      <CategoriesSelector selectedCategory={localQuery.category} onChange={handleCategoryChange} />
      {localQuery.category === 'Verb' && (
        <VerbTypeSwitch
          className={classNames(styles.radioBtnContainer)}
          selectedVerbType={localQuery.verbType}
          onChange={handleVerbTypeChange}
          variant="dashboard"
        />
      )}
    </div>
  );
}

// export default function Filters() {
//   const dispatch = useDispatch();

//   //отримати значення з глобального стану Redux
//   const searchQuery = useSelector(selectSearchQuery);
//   console.log('searchQuery з Redux:', searchQuery);
//   //отримати вибрану категорію з Redux
//   const selectedCategory = useSelector(selectSelectedCategory);

//   //локальний стан для зберігання значення, яке вводиться в інпут
//   const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

//   //для вибору типу дієслова
//   const selectedVerbType = useSelector(selectSelectedVerbType);

//   //оновити пошуковий запит у redux = синхронізувати локальний стан із глобальним
//   useEffect(() => {
//     setLocalSearchQuery(searchQuery);
//   }, [searchQuery]);

//   //реагує на зміну значення в інпуті
//   const handleSearchChange = e => {
//     //отримує нове значення з події (e.target.value)
//     const query = e.target.value;
//     //оновлює локальний стан
//     setLocalSearchQuery(query);
//     //відправляє новий пошуковий запит у глобальний стан через Redux
//     dispatch(setSearchQuery(query));
//   };
//   //відправляєвибрану категорію в Redux, оновлює глобальний стан
//   const handleCategoryChange = e => {
//     dispatch(setSelectedCategory(e.target.value));
//   };

//   const handleVerbTypeChange = useCallback(
//     e => dispatch(setSelectedVerbType(e.target.value)),
//     [dispatch]
//   );

//   return (
//     <div className={styles.filterContainer}>
//       <div className={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search words..."
//           value={localSearchQuery}
//           onChange={handleSearchChange}
//           className={styles.searchInput}
//         />
//         <CiSearch className={styles.searchIcon} />
//       </div>

//       <CategoriesSelector selectedCategory={selectedCategory} onChange={handleCategoryChange} />
//       {selectedCategory === 'Verb' && (
//         <VerbTypeSwitch
//           className={classNames(styles.radioBtnContainer)}
//           selectedVerbType={selectedVerbType}
//           onChange={handleVerbTypeChange}
//           variant="dashboard"
//         />
//       )}
//     </div>
//   );
// }
