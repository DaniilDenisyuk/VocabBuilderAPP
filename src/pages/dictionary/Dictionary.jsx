import WordsTable from '../../features/tables/WordsTable';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useSelector } from 'react-redux';
import { selectCurrentPage, selectItemsPerPage } from '../../features/filter/redux/filtersSlice';

export default function Dictionary() {
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);

  return (
    <div>
      <Dashboard />
      <WordsTable currentPage={currentPage} itemsPerPage={itemsPerPage} />
    </div>
  );
}
