import WordsTable from '../../features/tables/WordsTable';
import styles from './index.module.scss';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords } from '../../features/dictionary/redux/wordsOperations';
import {
  selectError,
  selectFilteredWords,
  selectLoading,
} from '../../features/dictionary/redux/wordsSlice';

export default function Dictionary() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredWords = useSelector(selectFilteredWords);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Dashboard />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <WordsTable filteredWords={filteredWords} />
    </div>
  );
}
