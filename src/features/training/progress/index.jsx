import {
  useGetUserStatisticsQuery,
  useGetUserTasksQuery,
} from '../../../infrastructure/api/redux/apiSlice';
import ProgressBar from '../../../layouts/progressBar/ProgressBar';
import styles from './index.module.scss';

const Progress = () => {
  const {
    data: userStatistics,
    isLoading: isLoadingStatistics,
    error: errorStatistics,
  } = useGetUserStatisticsQuery();

  const { data: userTasks, isLoading: isLoadingTasks, error: errorTasks } = useGetUserTasksQuery();

  if (isLoadingStatistics || isLoadingTasks) return <div>Loading...</div>;

  if (errorStatistics) return <div>Error fetching statistics: {errorStatistics.message}</div>;
  if (errorTasks) return <div>Error fetching tasks: {errorTasks.message}</div>;

  const totalTasks = userStatistics?.totalCount || 0;
  const userAnswers = userTasks?.words?.filter(word => word.isDone).length || 0;

  const progress = totalTasks ? (userAnswers / totalTasks) * 100 : 0;

  return (
    <div className={styles.progressBarContainer}>
      {Math.round(progress)}%
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Progress;
