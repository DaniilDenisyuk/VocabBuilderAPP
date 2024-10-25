import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './index.module.scss';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import Filters from '../../../filter/components/filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { fetchCategories } from '../../../category/redux/categoriesSlice';
import { setSelectedVerbType, selectSelectedVerbType } from '../../../filter/redux/filtersSlice';
import VerbTypeSwitch from '../../../category/components/VerbTypeSwitch';

export default function Dashboard({ className, onClose }) {
  const dispatch = useDispatch();
  const selectedVerbType = useSelector(selectSelectedVerbType);
  const [showVerbOptions] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleVerbTypeChange = useCallback(
    e => dispatch(setSelectedVerbType(e.target.value)),
    [dispatch]
  );

  return (
    <div className={classNames(styles.dashboard, className)}>
      <div className={styles.dashboardLeft}>
        <Filters />
        {showVerbOptions && (
          <VerbTypeSwitch
            selectedVerbType={selectedVerbType}
            onChange={handleVerbTypeChange}
            className={classNames(styles.radioBtnContainer)}
            variant="modal"
          />
        )}
      </div>
      <div className={styles.dashboardRight}>
        <ModalProvider>
          <ModalTrigger>
            <div className={styles.addWordBtn}>
              Add word <FiPlus className={styles.iconAdd} />
            </div>
          </ModalTrigger>
          <AddWordFormModal onClose={onClose} />
        </ModalProvider>
      </div>
    </div>
  );
}
