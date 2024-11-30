//ClassesTeachersPupils.jsx
import style from './index.module.scss';
import Draggable from '../dnd/Draggable';
// import { DndContext } from '@dnd-kit/core';
import Droppable from '../dnd/Droppable';
export default function ClassesTeachersPupils({
  classes,
  pupils,
  teachers,
  // onPupilTransfer,
  // onTeacherCopy,
}) {
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

  return (
    <>
      <div className={style.container}>
        <h3>Classes & Teachers & Pupils</h3>
        <div>
          {/* <DndContext onDragEnd={handleDragEnd}> */}
          <ul className={style.list}>
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
                      <ol>
                        {classTeachers.length === 0 ? (
                          <li>-</li>
                        ) : (
                          classTeachers.map(teacher => (
                            <li key={teacher.id}>
                              <Draggable id={`teacher-${teacher.id}`}>
                                <span>{teacher.name}</span>
                              </Draggable>
                            </li>
                          ))
                        )}
                      </ol>
                      <h4>Pupils:</h4>
                      <ol>
                        {classPupils.length === 0 ? (
                          <li>-</li>
                        ) : (
                          classPupils.map(pupil => (
                            <li key={pupil.id}>
                              <Draggable id={`pupil-${pupil.id}`}>
                                <span>{pupil.name}</span>
                              </Draggable>
                            </li>
                          ))
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
          {/* </DndContext> */}
        </div>
      </div>
    </>
  );
}
