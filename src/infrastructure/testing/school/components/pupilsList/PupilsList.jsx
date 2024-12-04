import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import ClassSelector from '../classesList/ClassSelector';
import { useCallback, useState } from 'react';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, updItems } from '../../redux/schoolSlice';

export default function PupilsList() {
  //!
  const dispatch = useDispatch();
  const pupils = useSelector(state => state.school.pupils || []);
  const classes = useSelector(state => state.school.classes || []);

  //!
  const [error, setError] = useState('');
  const [pupilName, setPupilName] = useState('');

  function handleAddPupil() {
    if (!pupilName.trim()) {
      setError('Pupil name cannot be empty');
      return;
    }
    setError('');
    const newId = pupils.length > 0 ? pupils[pupils.length - 1].id + 1 : 1;

    dispatch(
      addItem({
        field: 'pupils',
        item: { id: newId, name: pupilName, slassId: '' },
      })
    );
    setPupilName('');
  }

  const handleDelPupil = useCallback(
    id => {
      if (!id) {
        console.error('Invalid pupil id:', id);
        return;
      }

      const pupilToDelete = pupils.find(cl => cl.id === id);
      if (pupilToDelete) {
        dispatch(deleteItem({ field: 'pupils', itemId: id }));
      } else {
        console.error('pupil not found:', id);
      }
    },
    [dispatch, pupils]
  );

  const handleKeyDown = useEnterKeyHandler(handleAddPupil);

  return (
    <>
      <div className={style.pupilsListContainer}>
        <h2>Pupils</h2>
        <div className={style.input}>
          <input
            placeholder="Add pupil"
            value={pupilName}
            onChange={e => setPupilName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddPupil} className={style.addButton}>
            Add pupil
          </button>
          {error && <p className={style.error}>{error}</p>}
        </div>

        <div className={style.pupilList}>
          {pupils.length === 0 ? (
            <p>No pupils available.</p>
          ) : (
            <table className={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pupils.map((pupil, index) => (
                  <tr key={pupil.id} className={style.row}>
                    <td>
                      <span className={style.itemNumber}>{index + 1}</span>
                    </td>
                    <td>
                      <Draggable id={`pupil-${pupil.id}`}>{pupil.name}</Draggable>
                    </td>
                    <td>
                      <ClassSelector
                        classes={classes}
                        currentClassId={pupil.classId}
                        onChange={newClassId =>
                          dispatch(
                            updItems({
                              field: 'pupils',
                              itemId: pupil.id,
                              updatedData: { classId: newClassId },
                            })
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelPupil(pupil.id)}
                        className={style.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
