import WordsTable from '../../features/tables/WordsTable';
import styles from './index.module.scss';
import { WordProvider } from '../../features/dashboard/WordProvider';
import Dashboard from '../../features/dashboard/components/dashboard';
import { useState } from 'react';

export default function Dictionary() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container}>
      <WordProvider>
        <Dashboard setSearchQuery={setSearchQuery} />
        <WordsTable searchQuery={searchQuery} />{' '}
      </WordProvider>

      {/* <WordsPagination /> */}
    </div>
  );
}
