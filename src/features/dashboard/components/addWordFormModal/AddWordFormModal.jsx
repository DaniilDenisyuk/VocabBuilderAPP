import { useContext } from 'react';
import Modal from '../../../../infrastructure/modal/components/Modal';
import { ModalContext } from '../../../../infrastructure/modal/components/ModalProvider';
import AddWordForm from './AddWordForm';

export default function AddWordFormModal() {
  const { setOpen } = useContext(ModalContext);

  return (
    <Modal
      title="Add word"
      description="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      content={<AddWordForm onClose={() => setOpen(false)} />}
    ></Modal>
  );
}
