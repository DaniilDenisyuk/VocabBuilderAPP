//PopoverContent.jsx
import styles from './index.module.scss';
import { FloatingFocusManager } from '@floating-ui/react';
import { usePopoverContext } from './usePopoverContext';
import { ArrowTooltip } from './ArrowTooltip';

export function PopoverContent({ children }) {
  const { refs, getFloatingProps, isPopoverOpen, floatingStyles, arrowRef, context } =
    usePopoverContext();

  if (!isPopoverOpen) return null;

  return (
    <FloatingFocusManager context={context} modal={false}>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className={styles.popoverContent}
      >
        {children}
        <ArrowTooltip arrowRef={arrowRef} className={styles.popoverArrow} />
      </div>
    </FloatingFocusManager>
  );
}
