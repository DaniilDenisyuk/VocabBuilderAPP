//PopoverTrigger.jsx
import styles from './index.module.scss';
import { usePopoverContext } from './usePopoverContext';

export function PopoverTrigger({ children, onClick, ...props }) {
  const { refs, getReferenceProps, setIsPopoverOpen, isPopoverOpen } = usePopoverContext();

  const handleClick = e => {
    setIsPopoverOpen(!isPopoverOpen);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={refs.setReference}
      {...getReferenceProps()}
      onClick={handleClick}
      {...props}
      className={styles.trigger}
    >
      {children}
    </button>
  );
}
