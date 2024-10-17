//ModalDescription.jsx
import { forwardRef, useEffect, useId } from 'react';
import style from './index.module.scss';
import classNames from 'classnames';
import useModalContext from '../../repository/useModalContext';

export default forwardRef(function ModalDescription({ As = 'p', className, ...rest }, ref) {
  const { setDescriptionId } = useModalContext();
  const id = useId();
  useEffect(() => {
    setDescriptionId(id);
    return () => {
      setDescriptionId(null);
    };
  }, [id, setDescriptionId]);
  return <As ref={ref} id={id} {...rest} className={classNames(style.label, className)}></As>;
});
