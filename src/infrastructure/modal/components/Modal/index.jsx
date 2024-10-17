//Modal.jsx

import classNames from 'classnames';
import styles from './index.module.scss';
import { forwardRef } from 'react';
import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import useModalContext from '../../repository/useModalContext';
import ModalLabel from '../ModalLabel';
import ModalDescription from '../ModalDescription';
import ModalCloseBtn from '../ModalCloseBtn';

export default forwardRef(function Modal({ title, description, content, className, ...rest }, ref) {
  const { context, open, getFloatingProps, labelId, descriptionId } = useModalContext();

  return open ? (
    <FloatingOverlay lockScroll className={styles.modalOverlay}>
      <FloatingFocusManager context={context}>
        <div
          {...getFloatingProps({
            ref,
            className: classNames(styles.modalСontainer, className),
            'aria-labelledby': labelId,
            'aria-describedby': descriptionId,
            ...rest,
          })}
        >
          <div>
            {typeof title === 'string' ? (
              <ModalLabel className={styles.modalHeader}>{title}</ModalLabel>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <ModalDescription className={styles.modalDescription}>{description}</ModalDescription>
            ) : (
              description
            )}
            <ModalCloseBtn className={styles.closeBtn} />
          </div>
          <div className={styles.modalСontent}>{content}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
});
