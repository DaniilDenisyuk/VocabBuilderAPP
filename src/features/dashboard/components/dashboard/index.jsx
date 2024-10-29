import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './index.module.scss';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import Filters from '../../../filter/components/filters/Filters';
import { selectFilteredWords, setSelectedCategory } from '../../../filter/redux/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useGetWordsAllQuery } from '../../../../infrastructure/api/redux/apiSlice';
import { setWords } from '../../../dictionary/redux/wordsSlice';

export default function Dashboard({ className, onClose }) {
  const dispatch = useDispatch();
  const filteredWords = useSelector(selectFilteredWords);
  const { data: words, error, isLoading } = useGetWordsAllQuery();
  useEffect(() => {
    if (words) {
      dispatch(setWords(words));
    }
  }, [words, dispatch]);

  const handleCategoryChange = useCallback(
    category => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading words!</div>;
  return (
    <div className={classNames(styles.dashboard, className)}>
      <div className={styles.dashboardLeft}>
        <Filters filteredWords={filteredWords} onCategoryChange={handleCategoryChange} />
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
