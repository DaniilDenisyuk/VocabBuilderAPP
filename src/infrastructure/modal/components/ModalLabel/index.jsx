//ModalLabel.jsx

import { forwardRef, useEffect, useId } from 'react';
import style from './index.module.scss';
import classNames from 'classnames';
import useModalContext from '../../repository/useModalContext';

export default forwardRef(function ModalLabel({ As = 'h3', className, ...rest }, ref) {
  const { setLabelId } = useModalContext();
  const id = useId();
  useEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(null);
    };
  }, [id, setLabelId]);
  return <As ref={ref} id={id} {...rest} className={classNames(style.label, className)}></As>;
});
