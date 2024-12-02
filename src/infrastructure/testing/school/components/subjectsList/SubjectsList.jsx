import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import { useState } from 'react';

export default function SubjectsList({ subjects, onAddSubject, onDelSubject }) {
  console.log(subjects);
  const [subjectName, setSubjectName] = useState('');

  const handleKeyDown = useEnterKeyHandler(handleAddSubject);

  function handleAddSubject() {
    onAddSubject(subjectName);
    setSubjectName('');
  }

  function handleDelSubject(subjectId) {
    onDelSubject(subjectId);
  }

  return (
    <>
      <div className={style.subjectsContainer}>
        <h2>Subjects</h2>
        <div className={style.inputContainer}>
          <input
            placeholder="add subject"
            value={subjectName}
            onChange={e => setSubjectName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddSubject} className={style.addButton}>
            Add subject
          </button>
          <div className={style.subjectsList}>
            {subjects && subjects.length > 0 ? (
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {subjects.map((subject, index) => (
                  <tr key={`${subject.id}-${index}`} className={style.classItem}>
                    <td>
                      <span className={style.itemNumber}>{index + 1}</span>
                    </td>
                    <td>
                      <Draggable id={`subject-${subject.id}`}>{subject.name}</Draggable>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelSubject(subject.id)}
                        className={style.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            ) : (
              <p>No subjects available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
