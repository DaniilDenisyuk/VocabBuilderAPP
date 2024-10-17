//ModalCloseBtn.jsx
import { forwardRef } from 'react';
import style from './index.module.scss';
import classNames from 'classnames';
import useModalContext from '../../repository/useModalContext';

const ModalCloseBtn = forwardRef(function ModalCloseBtn({ className, ...props }, ref) {
  const { setOpen } = useModalContext();
  return (
    <button
      type="button"
      ref={ref}
      onClick={() => setOpen(false)}
      {...props}
      className={classNames(style.btn, className)}
    >
      X
    </button>
  );
});
export default ModalCloseBtn;
