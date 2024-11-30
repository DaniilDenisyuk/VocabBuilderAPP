// import { DndContext } from '@dnd-kit/core';
// import Droppable from '../dnd/Droppable';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import ClassSelector from '../classesList/ClassSelector';
import { useState } from 'react';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';

export default function PupilsList({
  pupils = [],
  classes = [],
  // onTransfer,
  onClassChange,
  onAddPupil,
  onDelPupil,
}) {
  const [pupilName, setPupilName] = useState('');

  // const handleDragEnd = event => {
  //   const { active, over } = event;

  //   if (!active || !over) {
  //     console.log('Drop failed: no valid target.');
  //     return;
  //   }

  //   const pupilId = parseInt(active.id.replace('pupil-', ''), 10);
  //   const newClassId = parseInt(over.id.replace('class-', ''), 10);

  //   console.log(`Pupil ${pupilId} moved to class ${newClassId}`);
  //   onTransfer(pupilId, newClassId, true);
  // };
  const handleKeyDown = useEnterKeyHandler(handleAddPupil);

  function handleAddPupil() {
    if (!pupilName.trim()) {
      console.warn('Pupil name cannot be empty.');
      return;
    }
    onAddPupil(pupilName.trim());
    setPupilName('');
  }

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
        </div>

        <div className={style.pupilList}>
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
                      onChange={newClassId => onClassChange(pupil.id, newClassId, true)}
                    />
                  </td>
                  <td>
                    <button onClick={() => onDelPupil(pupil.id)} className={style.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className={style.pupilsListByClassContainer}>
          <h3>Pupils by class</h3>
          <div className={style.pupilsListByClass}>
            <DndContext onDragEnd={handleDragEnd}>
              {classes.map(classItem => {
                const classPupils = pupils.filter(pupil => pupil.classId === classItem.id);

                return (
                  <Droppable id={`class-${classItem.id}`} key={classItem.id}>
                    <div className={style.classContainer}>
                      <h3>{classItem.name}</h3>
                      <ol className={style.pupilsList}>
                        {classPupils.length === 0 ? (
                          <li>No pupils in this class</li>
                        ) : (
                          classPupils.map(pupil => (
                            <li key={pupil.id}>
                              <Draggable id={`pupil-${pupil.id}`}>{pupil.name}</Draggable>
                              <ClassSelector
                                classes={classes}
                                currentClassId={pupil.classId}
                                onChange={newClassId => onClassChange(pupil.id, newClassId, true)}
                              />
                            </li>
                          ))
                        )}
                      </ol>
                    </div>
                  </Droppable>
                );
              })}
            </DndContext>
          </div>
        </div> */}
      </div>
    </>
  );
}
