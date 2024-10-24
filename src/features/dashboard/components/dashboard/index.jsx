import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './index.module.scss';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import Filters from '../../../filter/components/filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../../category/redux/categoriesSelectors';
import { useCallback, useEffect, useState } from 'react';
import { fetchCategories } from '../../../category/redux/categoriesSlice';
import {
  setSelectedVerbType,
  selectSelectedCategory,
  selectSearchQuery,
  selectSelectedVerbType,
} from '../../../filter/redux/filtersSlice';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';

export default function Dashboard({ setSearchQuery, setSelectedCategory, className, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedVerbType = useSelector(selectSelectedVerbType);
  const [showVerbOptions, setShowVerbOptions] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchQueryChange = useCallback(
    e => {
      setSearchQuery(e);
      dispatch(setSearchQuery(e));
    },
    [dispatch, setSearchQuery]
  );

  const handleCategoryChange = useCallback(
    e => {
      const category = e.target.value;
      setSelectedCategory(category);
      dispatch(setSelectedCategory(category));
    },
    [dispatch, setSelectedCategory]
  );

  const handleVerbTypeChange = useCallback(
    e => {
      const newVerbType = e.target.value;
      dispatch(setSelectedVerbType(newVerbType));
      setShowVerbOptions(newVerbType === 'Verb');
    },
    [dispatch]
  );

  return (
    <div className={classNames(styles.dashboard, className)}>
      <div className={styles.dashboardLeft}>
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedVerbType={selectedVerbType}
          searchQuery={searchQuery}
          setSearchQuery={handleSearchQueryChange}
          handleCategoryChange={handleCategoryChange}
          handleVerbTypeChange={handleVerbTypeChange}
        />
        {showVerbOptions && (
          <VerbTypeSwitch
            selectedVerbType={selectedVerbType}
            onChange={handleVerbTypeChange}
            className={classNames(styles.radioBtnContainer)}
            selectStyleName="modal"
          />
        )}
      </div>
      <div className={styles.dashboardRight}>
        <ModalProvider>
          <ModalTrigger>
            <div className={styles.addWordBtn}>
              Add word <FiPlus className={styles.iconAdd} />
            </div>
          </ModalTrigger>
          <AddWordFormModal onClose={onClose} />
        </ModalProvider>
      </div>
    </div>
  );
}
