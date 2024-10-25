import WordsTable from '../../features/tables/WordsTable';
import styles from './index.module.scss';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords } from '../../features/dictionary/redux/wordsOperations';
import {
  selectError,
  selectLoading,
  selectWords,
} from '../../features/dictionary/redux/wordsSlice';
import { useLocation } from 'react-router-dom';

export default function Dictionary() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const words = useSelector(selectWords);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const searchParams = new URLSearchParams(location.search);

  const filters = {
    searchQuery: searchParams.get('searchQuery') || '',
    category: searchParams.get('category') || '',
    verbType: searchParams.get('verbType') || '',
  };

  const filteredWords = useMemo(() => {
    return words.filter(word => {
      const isMatchSearchQuery = filters.searchQuery
        ? word.en.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          word.ua.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;
      const isMatchCategory = filters.category ? word.category === filters.category : true;
      const isMatchVerbType = filters.verbType
        ? (filters.verbType === 'Regular' && word.Regular) ||
          (filters.verbType === 'Irregular' && word.Irregular)
        : true;

      return isMatchSearchQuery && isMatchCategory && isMatchVerbType;
    });
  }, [words, filters]);

  return (
    <div className={styles.container}>
      <Dashboard />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <WordsTable filteredWords={filteredWords} />
    </div>
  );
}
