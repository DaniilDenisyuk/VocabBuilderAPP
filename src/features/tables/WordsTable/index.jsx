import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './index.module.scss';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectIsIrregular,
  selectKeyword,
  setCurrentPage,
} from '../../filter/redux/filtersSlice';
import { useGetWordAllPaginatedQuery } from '../../../infrastructure/api/redux/apiSlice';
import DictionaryActionCell from '../../dictionary/components/DictionaryActionCell';
import Progress from '../../training/progress';
import WordPagination from '../../pagination';

const WordsTable = ({ onEdit, onDelete, currentPage, itemsPerPage = 7 }) => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const category = useSelector(selectCategory);
  const isIrregular = useSelector(selectIsIrregular);

  const queryParameters = useMemo(() => {
    return {
      page: Math.max(1, currentPage),
      limit: itemsPerPage,
      keyword: keyword?.trim() || undefined,
      category: category || undefined,
      isIrregular: category === 'verb' ? isIrregular : undefined,
    };
  }, [currentPage, itemsPerPage, keyword, category, isIrregular]);

  // console.log('444 Query parameters:', queryParameters);
  const { data: paginatedWords, error, isLoading } = useGetWordAllPaginatedQuery(queryParameters);
  const wordsData = paginatedWords?.results || [];
  const pageCount = paginatedWords?.totalPages || 0;

  // const perPage = paginatedWords?.perPage || itemsPerPage;
  // const totalWords = pageCount * perPage;
  // console.log('wordsData:', wordsData);
  // console.log('totalWords:', totalWords);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor('en', {
        id: 'word',
        header: () => 'Word',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('ua', {
        id: 'translation',
        header: () => 'Translation',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: () => 'Category',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('progress', {
        id: 'progress',
        header: () => 'Progress',
        cell: info => (
          <div className={styles.progressContainer}>
            <Progress progress={info.getValue()} />
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => '',
        cell: ({ row }) => <DictionaryActionCell row={row} onEdit={onEdit} onDelete={onDelete} />,
      }),
    ],
    [onEdit, onDelete]
  );
  // useEffect(() => {
  //   console.log('555 Current Filters:', {
  //     keyword,
  //     category,
  //     isIrregular,
  //   });
  // }, [keyword, category, isIrregular]);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= pageCount) {
      dispatch(setCurrentPage(newPage));
    }
  };

  const table = useReactTable({
    data: wordsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: Math.max(1, currentPage - 1),
        pageSize: itemsPerPage,
      },
    },
    onPaginationChange: handlePageChange,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    // console.error('Error fetching paginated words:', error);
    return <div>Error occurred: {error.status ? error.status : 'Unknown error'}</div>;
  }

  return (
    <>
      <table className={styles.tableContainer}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.tr}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={styles.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <WordPagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageCount={pageCount}
      />
    </>
  );
};

export default WordsTable;
