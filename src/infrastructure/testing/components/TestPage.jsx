import { ThemeProvider } from '../../../myTestThemeContext/ThemeContext';
import ThemedComponent from '../../../myTestThemeContext/ThemedComponent';
import TestTrim from '../../utils';
import BallMover from '../tasks/features/task1/BallMover';
import Task2 from '../tasks/features/task2/Task2';
import styles from './index.module.scss';

export default function TestPage() {
  return (
    <div className={styles.testing_container}>
      <BallMover />
      <Task2 />
      <TestTrim />
      <ThemeProvider>
        <div>
          <h1>Themed App</h1>
          <ThemedComponent />
        </div>
      </ThemeProvider>
    </div>
  );
}
