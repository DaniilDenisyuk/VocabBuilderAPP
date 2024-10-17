import styles from './index.module.scss';

const ProgressBar = ({ progress }) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = 50;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className={styles.progress_bar}>
      <svg
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
      >
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#D4F8D3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#2BD627"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
        />
      </svg>
    </div>
  );
};

export default ProgressBar;
