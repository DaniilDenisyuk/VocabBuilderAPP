// import { DndContext } from '@dnd-kit/core';
// import Droppable from '../dnd/Droppable';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import { useState } from 'react';

export default function ClassesList({
  classes,
  // pupils,
  // teachers,
  // onPupilTransfer,
  // onTeacherCopy,
  onAddClass,
  onDelClass,
}) {
  const [className, setClassName] = useState('');

  // const handleDragEnd = event => {
  //   const { active, over } = event;

  //   if (!active || !over) {
  //     console.log('Drop failed: no valid target.');
  //     return;
  //   }

  //   const itemId = active.id.split('-')[1];
  //   const newClassId = parseInt(over.id.replace('class-', ''), 10);

  //   if (active.id.startsWith('pupil-')) {
  //     onPupilTransfer(parseInt(itemId, 10), newClassId);
  //   }

  //   if (active.id.startsWith('teacher-')) {
  //     onTeacherCopy(parseInt(itemId, 10), newClassId);
  //   }
  // };
  const handleKeyDown = useEnterKeyHandler(handleAddClass);
  function handleAddClass() {
    onAddClass(className);
    setClassName('');
  }

  function handleDelClass(classId) {
    onDelClass(classId);
  }

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
                {classes.map((cl, index) => (
                  <tr key={cl.id} className={style.classItem}>
                    <td>
                      <span className={style.itemNumber}>{index + 1}</span>
                    </td>
                    <td>
                      <Draggable id={`pupil-${cl.id}`}>{cl.name}</Draggable>
                    </td>
                    <td>
                      <button onClick={() => handleDelClass(cl.id)} className={style.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            ) : (
              <p>No classes available</p>
            )}
          </div>
        </div>

        {/* <div className={style.allClassesListContainer}>
          <h3>Classes</h3>
          <div className={style.classesListContainer}>
            <DndContext onDragEnd={handleDragEnd}>
              <ul className={style.classesList}>
                {classes.length > 0 ? (
                  classes.map(classItem => {
                    const classPupils = pupils.filter(pupil => pupil.classId === classItem.id);
                    const classTeachers = teachers.filter(teacher =>
                      teacher.classIds.includes(classItem.id)
                    );

                    return (
                      <li key={classItem.id}>
                        <Droppable id={`class-${classItem.id}`}>
                          <h3>{classItem.name}</h3>
                          <h4>Teachers:</h4>
                          <ul>
                            {classTeachers.length === 0 ? (
                              <li>No teachers assigned</li>
                            ) : (
                              classTeachers.map(teacher => (
                                <li key={teacher.id}>
                                  <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
                                </li>
                              ))
                            )}
                          </ul>
                          <h4>Pupils:</h4>
                          <ol>
                            {classPupils.length === 0 ? (
                              <li>No pupils assigned</li>
                            ) : (
                              classPupils.map(pupil => <li key={pupil.id}>{pupil.name}</li>)
                            )}
                          </ol>
                        </Droppable>
                      </li>
                    );
                  })
                ) : (
                  <p>No classes available</p>
                )}
              </ul>
            </DndContext>
          </div>
        </div> */}
      </div>
    </>
  );
}
