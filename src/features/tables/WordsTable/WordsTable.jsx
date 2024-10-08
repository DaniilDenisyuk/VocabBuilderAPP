import { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './styles.module.css';
import DictionaryActionCell from '../../dictionary/components/DictionaryRecordActionCell/DictionaryActionCell';
import defaultData from '../../../infrastructure/utils/data';
import ProgressBar from '../../../layouts/progressBar/ProgressBar';
// import AddWordModal from '../../dashboard/components/addWordFormModal/AddWordFormModal';

const WordsTable = ({ data = defaultData, onEdit, onDelete }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [words] = useState(data);

  const columnHelper = createColumnHelper();
  const columns = [
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
        <div className={styles.progress_container}>
          {`${info.getValue()}%`}
          <ProgressBar progress={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => '',
      cell: ({ row }) => <DictionaryActionCell row={row} onEdit={onEdit} onDelete={onDelete} />,
    }),
  ];

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // const handleAddWord = newWord => {
  //   setWords(prevWords => [...prevWords, newWord]);
  // };

  if (!data || data.length === 0) {
    return <p>No data variables</p>;
  }

  return (
    <>
      {/* //   <AddWordModal
    //     isOpen={isModalOpen}
    //     onRequestClose={() => setIsModalOpen(false)}
    //     onAddWord={handleAddWord}
    //   /> */}

      <table className={styles.table}>
        {/* thead */}
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
        {/* tbody */}
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
    </>
  );
};

export default WordsTable;
