import Ball from './Ball';
import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function BallMover() {
  const [isMoving, setIsMoving] = useState(true);
  const refBall = useRef(null);

  const moveIntervalRef = useRef(null);
  const logIntervalRef = useRef(null);

  useEffect(() => {
    const moveBall = () => {
      const ball = refBall.current;
      const container = ball?.parentElement;

      if (!ball || !container) return;

      const containerRect = container.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();

      const maxX = containerRect.width - ballRect.width;
      const maxY = containerRect.height - ballRect.height;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      ball.style.position = 'absolute';
      ball.style.left = `${randomX}px`;
      ball.style.top = `${randomY}px`;
    };
    const logPosition = () => {
      const ball = refBall.current;
      if (ball) {
        const rect = ball.getBoundingClientRect();
        console.log(`Ball position x: ${Math.round(rect.left)}px, y:${Math.round(rect.top)}px`);
      }
    };
    if (isMoving) {
      moveIntervalRef.current = setInterval(moveBall, 1000);
      logIntervalRef.current = setInterval(logPosition, 1500);
    }

    return () => {
      clearInterval(moveIntervalRef.current);
      clearInterval(logIntervalRef.current);
    };
  }, [isMoving]);

  const startMoving = () => setIsMoving(true);
  const stopMoving = () => setIsMoving(false);

  return (
    <>
      <p className={styles.title}>
        T1. Write component that every second randomly change position of element and logs it`s
        position every 1.5 second logs element`s position
      </p>
      <div className={styles.ball_container}>
        <div className={styles.btns}>
          <button className={styles.btn_start} onClick={startMoving}>
            Start
          </button>
          <button className={styles.btn_stop} onClick={stopMoving}>
            Stop
          </button>
        </div>
        <Ball ref={refBall} />
      </div>
    </>
  );
}
