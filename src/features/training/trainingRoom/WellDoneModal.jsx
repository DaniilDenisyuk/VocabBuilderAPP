import { useContext } from 'react';
import ModalProvider, {
  ModalContext,
} from '../../../infrastructure/modal/components/ModalProvider';
import Modal from '../../../infrastructure/modal/components/Modal';

export default function WellDoneModal({ correctAnswers, mistakes }) {
  const { setOpen } = useContext(ModalContext);

  return (
    <ModalProvider>
      <Modal
        title="Well done"
        content={
          <div>
            <h3>Сorrect answers: </h3>
            <ul>
              {correctAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            {mistakes.length > 0 && (
              <>
                <h3>Mistakes:</h3>
                <ul>
                  {mistakes.map((mistake, index) => (
                    <li key={index}>{mistake.answer}</li>
                  ))}
                </ul>
              </>
            )}
            <button onClick={() => setOpen(false)}>Save</button>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        }
      />
    </ModalProvider>
  );
}
