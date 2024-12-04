import { useDispatch, useSelector } from 'react-redux';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import { useCallback, useState } from 'react';
import { addItem, deleteItem } from '../../redux/schoolSlice';

export default function SubjectsList() {
  const dispatch = useDispatch();
  const subjects = useSelector(state => state.school.subjects || []);

  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');

  const handleAddSubject = useCallback(() => {
    if (!subjectName.trim()) {
      setError('Subject name cannot be empty');
      return;
    }
    setError('');
    const newId = subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;

    dispatch(
      addItem({
        field: 'subjects',
        item: { id: newId, name: subjectName, teacherIds: [] },
      })
    );
    setSubjectName('');
  }, [dispatch, subjectName]);

  const handleDelSubject = useCallback(
    id => {
      if (!id) {
        console.error('Invalid subject id:', id);
        return;
      }

      const subjectToDelete = subjects.find(cl => cl.id === id);
      if (subjectToDelete) {
        dispatch(deleteItem({ field: 'subjects', itemId: id }));
      } else {
        console.error('subject not found:', id);
      }
    },
    [dispatch, subjects]
  );

  const handleKeyDown = useEnterKeyHandler(handleAddSubject);

  return (
    <div className={style.subjectsContainer}>
      <h2>Subjects</h2>
      <div className={style.inputContainer}>
        <input
          placeholder="Add subject"
          value={subjectName}
          onChange={e => setSubjectName(e.target.value)}
          onKeyDown={handleKeyDown}
          className={style.inputField}
        />
        <button onClick={handleAddSubject} className={style.addButton}>
          Add subject
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>

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
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject.id} className={style.classItem}>
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
            </tbody>
          </table>
        ) : (
          <p>No subjects available</p>
        )}
      </div>
    </div>
  );
}
