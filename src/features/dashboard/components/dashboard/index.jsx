import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './index.module.scss';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import Filters from '../../../filter/components/filters/Filters';
import { useState } from 'react';

export default function Dashboard({ onClose, className, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVerbType, setSelectedVerbType] = useState('');

  const handleCategoryChange = newCategory => {
    setSelectedCategory(newCategory);
  };

  const handleVerbTypeChange = newVerbType => {
    setSelectedVerbType(newVerbType);
  };
  return (
    <div className={classNames(styles.dashboard, className)}>
      <div className={styles.dashboardLeft}>
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedVerbType={selectedVerbType}
          handleCategoryChange={handleCategoryChange}
          handleVerbTypeChange={handleVerbTypeChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
