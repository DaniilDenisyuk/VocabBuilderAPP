import { createContext, useCallback, useState } from 'react';
import useModal from '../repository/useModal';

export const ModalContext = createContext();

export default function ModalProvider({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = useCallback(content => {
    console.log('Opening modal with content:', content);
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    console.log('Closing modal');
    setIsOpen(false);
    setModalContent(null);
  }, []);

  const context = useModal({
    open,
    onOpenChange,
    isOpen,
    modalContent,
    setOpen: setIsOpen,
    openModal,
    closeModal,
  });

  return (
    <ModalContext.Provider value={context}>
      {children}
      {isOpen && <div className="modal">{modalContent}</div>}
    </ModalContext.Provider>
  );
}
