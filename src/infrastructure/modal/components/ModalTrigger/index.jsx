// ModalTrigger.jsx
import { forwardRef } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';
import useModalTrigger from '../../repository/useModalTrigger';
import useModalContext from '../../repository/useModalContext';

const ModalTrigger = forwardRef(function ModalTrigger({ children, className, ...rest }, outerRef) {
  const { setOpen } = useModalContext();

  const { getReferenceProps, ref } = useModalTrigger({ ref: outerRef });
  return (
    <button
      {...getReferenceProps({
        ref,
        className: classNames(style.btn, className),
        type: 'button',
        onClick: () => setOpen(true),
        ...rest,
      })}
    >
      {children}
    </button>
  );
});
export default ModalTrigger;
//ModalTrigger:
// Це компонент, який отримує outerRef через forwardRef і передає його в useModalTrigger.
// В результаті useModalTrigger повертає злитий ref і необхідні пропси для елемента.
