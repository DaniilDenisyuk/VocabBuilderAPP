import styles from './index.module.scss';
import { forwardRef } from 'react';

const Ball = forwardRef(function Ball(props, ref) {
  return (
    <div ref={ref} className={styles.ball}>
      Ball
    </div>
  );
});

export default Ball;
