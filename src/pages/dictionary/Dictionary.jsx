import WordsTable from '../../features/tables/WordsTable';
import styles from './index.module.scss';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectWords,
  selectLoading,
  selectError,
} from '../../features/dictionary/redux/wordsSlice';
import { fetchWords } from '../../features/dictionary/redux/wordsOperations';

export default function Dictionary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const words = useSelector(selectWords);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const filteredWords = useMemo(() => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return words.filter(word => {
      const matchesSearch =
        word.en.toLowerCase().includes(lowerCaseSearchQuery) ||
        word.ua.toLowerCase().includes(lowerCaseSearchQuery);
      const matchesCategory = selectedCategory ? word.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [words, searchQuery, selectedCategory]);

  return (
    <div className={styles.container}>
      <Dashboard setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <WordsTable filteredWords={filteredWords} />
    </div>
  );
}
