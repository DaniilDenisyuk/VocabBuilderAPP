import styles from './index.module.scss';
import WordsTable from '../features/tables/WordsTable/WordsTable';

const Recommend = () => {
  return (
    <div className={styles.recommend_page}>
      <h1>Recommend</h1>
      <WordsTable />
    </div>
  );
};
export default Recommend;
