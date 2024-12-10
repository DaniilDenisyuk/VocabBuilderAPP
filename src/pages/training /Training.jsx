import { useState, useEffect } from 'react';
// import Notification from '../../../../infrastructure/notification/Notification';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  useFetchTasksQuery,
  usePostAnswersMutation,
} from '../../infrastructure/api/redux/apiSlice';
import WellDoneModal from '../../features/training/trainingRoom/WellDoneModal';

export default function Training() {
  const navigate = useNavigate();
  const { data: tasks, isLoading, error } = useFetchTasksQuery();
  const [postAnswers] = usePostAnswersMutation();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [mistakes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [notification, setNotification] = useState('');

  console.log('Initial render - tasks:', tasks);

  useEffect(() => {
    console.log('useEffect - tasks changed:', tasks);
    if (tasks) {
      setCorrectAnswers(tasks.map(task => task.ua));
      console.log(
        'Correct answers set:',
        tasks.map(task => task.ua)
      );
    }
  }, [tasks]);

  const handleNext = () => {
    console.log(
      'handleNext called - current task index:',
      currentTaskIndex,
      'user answer:',
      userAnswer
    );

    if (userAnswer.trim()) {
      setUserAnswers(prev => {
        const updatedAnswers = [...prev, userAnswer];
        console.log('User answers updated:', updatedAnswers);
        return updatedAnswers;
      });
      setUserAnswer('');
    }
    setCurrentTaskIndex(prev => {
      const newIndex = Math.min(prev + 1, tasks.words.length - 1);
      console.log('New task index:', newIndex);
      return newIndex;
    });
  };

  const handleSave = async () => {
    console.log('handleSave called - user answer:', userAnswer);

    if (userAnswer.trim()) {
      const answersToSubmit = [
        {
          _id: tasks.words[currentTaskIndex]._id,
          en: userAnswer,
          ua: tasks.words[currentTaskIndex].ua,
          task: tasks.words[currentTaskIndex].task,
        },
      ];
      console.log('Answers to submit:', answersToSubmit);

      try {
        await postAnswers(answersToSubmit).unwrap();
        console.log('Answer submitted successfully');

        setModalOpen(true);
      } catch (error) {
        console.error('Error save task:', error);
        // setNotification('Поточний прогрес не зберігся.');
      }
    }
  };

  const handleModalClose = () => {
    console.log('Modal close triggered');

    setModalOpen(false);
    navigate('/dictionary');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks.</div>;
  console.log(
    'Render - current task index:',
    currentTaskIndex,
    'current task:',
    tasks?.words?.[currentTaskIndex]
  );

  return tasks.length > 0 ? (
    <div className={styles.trainingRoom}>
      <div className={styles.taskSection}>
        {tasks.words[currentTaskIndex] && <h2>{tasks.words[currentTaskIndex].ua}</h2>}
        <input
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          placeholder="Введіть ваш переклад"
        />
        <button onClick={handleNext} disabled={currentTaskIndex === tasks.length - 1}>
          Next
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className={styles.feedbackSection}>
        <h3>Your Answers:</h3>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <WellDoneModal
          correctAnswers={correctAnswers}
          mistakes={mistakes}
          onClose={handleModalClose}
        />
      )}
      {/* {notification && <Notification message={notification} />} */}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
