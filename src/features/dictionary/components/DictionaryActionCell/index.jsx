import { useState, useCallback } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from './index.module.scss';
import EditWordFormModal from '../../../dashboard/components/editWordFormModal/EditWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import Popover from '../popover/Popover';
import { PopoverTrigger } from '../popover/PopoverTrigger';
import { PopoverContent } from '../popover/PopoverContent';
import { useDispatch } from 'react-redux';
import { deleteWord } from '../../redux/wordsOperations';

export default function DictionaryActionCell({ row }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);

  const handleDelete = useCallback(() => {
    try {
      const wordId = row.original.id;
      dispatch(deleteWord(wordId));
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  }, [row.original.id, deleteWord]);

  const handleEditClick = () => {
    setCurrentWord(row.original);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentWord(null);
  };

  return (
    <ModalProvider>
      <div className={styles.popoverContainer}>
        <Popover>
          <PopoverTrigger>
            <div className={styles.triggerButton}>
              <IoIosMore />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <ModalTrigger onClick={handleEditClick} className={styles.triggerBtn}>
              <div>
                <FiEdit2 className={styles.iconEdit} /> Edit
              </div>
            </ModalTrigger>
            <div onClick={handleDelete} className={styles.triggerBtn}>
              <RiDeleteBin6Line className={styles.iconDelete} /> Delete
            </div>
          </PopoverContent>
        </Popover>

        {isModalOpen && <EditWordFormModal currentWord={currentWord} onClose={handleCloseModal} />}
      </div>
    </ModalProvider>
  );
}
