import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Draggable from '../dnd/Draggable';
import Droppable from '../dnd/Droppable';
import style from './index.module.scss';
import ClassSelector from '../classesList/ClassSelector';

export default function TeachersList({
  teachers,
  classes,
  onTeacherTransfer,
  onClassChange,
  onAddTeacher,
  onDelTeacher,
}) {
  const [teacherName, setTeacherName] = useState('');

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!active || !over) {
      console.warn('Drag operation failed: missing active or over element.');
      return;
    }

    if (active.id.startsWith('teacher-') && over.id.startsWith('class-')) {
      const teacherId = parseInt(active.id.replace('teacher-', ''), 10);
      const newClassId = parseInt(over.id.replace('class-', ''), 10);

      console.log(`Teacher ${teacherId} moved to class ${newClassId}`);
      onTeacherTransfer(teacherId, newClassId);
    } else {
      console.warn('Invalid drag operation.');
    }
  }

  function handleAddTeacher() {
    if (!teacherName.trim()) {
      console.warn('Teacher name cannot be empty.');
      return;
    }
    onAddTeacher(teacherName.trim());
    setTeacherName('');
  }

  return (
    <>
      <h2>All Teachers</h2>

      <div className={style.inputContainerTeach}>
        <input
          placeholder="Add teacher"
          value={teacherName}
          onChange={e => setTeacherName(e.target.value)}
        />
        <button onClick={handleAddTeacher}>Add Teacher</button>
      </div>

      <div className={style.teachersGeneralContainer}>
        <div className={style.generalList}>
          <ol className={style.teachersList}>
            {teachers.map(teacher => (
              <li key={teacher.id} className={style.teacherItem}>
                <Draggable id={`teacher-${teacher.id}`}>
                  {teacher.name}
                  <ClassSelector
                    classes={classes}
                    currentClassIds={teacher.classIds}
                    onChange={newClassId => onClassChange(teacher.id, newClassId, false)}
                  />
                  <button onClick={() => onDelTeacher(teacher.id)} className={style.deleteButton}>
                    Delete
                  </button>
                </Draggable>
              </li>
            ))}
          </ol>
        </div>

        <div className={style.teachersContainer}>
          <h3>Teachers by Class</h3>
          <div className={style.teacherByClassContainer}>
            <DndContext onDragEnd={handleDragEnd}>
              {classes.map(classItem => (
                <Droppable
                  id={`class-${classItem.id}`}
                  key={classItem.id}
                  className={style.classContainer}
                >
                  <h3>{classItem.name}</h3>
                  <ol className={style.teachersList}>
                    {teachers
                      .filter(teacher => teacher.classIds.includes(classItem.id))
                      .map(teacher => (
                        <li key={teacher.id} className={style.teacherItem}>
                          <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
                        </li>
                      ))}
                  </ol>
                </Droppable>
              ))}
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}
