import { useGetUserStatisticsQuery } from '../../../../infrastructure/api/redux/apiSlice';
import styles from './index.module.scss';
const Statistics = () => {
  const { data, isLoading, isError } = useGetUserStatisticsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error('Error fetching user statistics:', isError);
    return <div>To study: 0</div>;
  }

  return (
    <div className={styles.statisticsContainer}>
      <p>To study: {data.totalCount !== undefined ? data.totalCount : 0}</p>
    </div>
  );
};
export default Statistics;
