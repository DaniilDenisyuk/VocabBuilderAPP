import WordsTable from '../../features/tables/WordsTable';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useSelector } from 'react-redux';
import { selectFilteredWords } from '../../features/filter/redux/filtersSlice';

export default function Dictionary() {
  const filteredWords = useSelector(selectFilteredWords);

  return (
    <div>
      <Dashboard />
      <WordsTable filteredWords={filteredWords} />
    </div>
  );
}
