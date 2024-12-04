import { useDispatch, useSelector } from 'react-redux';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import { useCallback, useState } from 'react';
import { addItem, deleteItem } from '../../redux/schoolSlice';

export default function ClassesList() {
  //!
  const dispatch = useDispatch();
  //отримати класи зі стор
  const classes = useSelector(state => state.school.classes || []);
  //!
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  function handleAddClass() {
    if (className.trim() === '') {
      setError('Class name cannot be empty.');
      return;
    }
    setError('');
    const newId = classes.length > 0 ? classes[classes.length - 1].id + 1 : 1;

    dispatch(
      addItem({
        field: 'classes',
        item: { id: newId, name: className, teacherIds: [], pupilIds: [] },
      })
    );
    // onAddClass(className);
    setClassName('');
  }
  const handleDelClass = useCallback(
    id => {
      if (!id) {
        console.error('Invalid class id:', id);
        return;
      }

      const classToDelete = classes.find(cl => cl.id === id);
      if (classToDelete) {
        dispatch(deleteItem({ field: 'classes', itemId: id }));
      } else {
        console.error('Class not found:', id);
      }
    },
    [dispatch, classes]
  );

  const handleKeyDown = useEnterKeyHandler(handleAddClass);
  return (
    <>
      <div className={style.classesContainer}>
        <h2>Classes</h2>
        <div className={style.inputContainer}>
          <input
            placeholder="add class"
            value={className}
            onChange={e => setClassName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddClass} className={style.addButton}>
            Add class
          </button>
          {error && <p className={style.error}>{error}</p>}
          <div className={style.classesList}>
            {classes && classes.length > 0 ? (
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cl, index) => (
                    <tr key={cl.id} className={style.classItem}>
                      <td>
                        <span className={style.itemNumber}>{index + 1}</span>
                      </td>
                      <td>
                        <Draggable id={`pupil-${cl.id}`}>{cl.name}</Draggable>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelClass(cl.id)}
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
              <p>No classes available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
