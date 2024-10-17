import { useContext } from 'react';
import Modal from '../../../../infrastructure/modal/components/Modal';
import EditWordForm from '../../../dashboard/components/editWordFormModal/EditWordForm';
import { ModalContext } from '../../../../infrastructure/modal/components/ModalProvider';

const EditWordFormModal = ({ currentWord = {} }) => {
  const { setOpen } = useContext(ModalContext);

  console.log('Rendering EditWordFormModal with word:', currentWord);

  return (
    <Modal
      content={
        <EditWordForm
          wordData={currentWord}
          onClose={() => {
            setOpen(false);
          }}
        />
      }
    />
  );
};
export default EditWordFormModal;
