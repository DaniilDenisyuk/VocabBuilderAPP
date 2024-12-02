import { useState } from 'react';
// import { DndContext } from '@dnd-kit/core';
import Draggable from '../dnd/Draggable';
// import Droppable from '../dnd/Droppable';
import style from './index.module.scss';
// import ClassSelector from '../classesList/ClassSelector';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import ClassesMultiSelector from '../classesList/ClassesMultiSelector';
import SubjectsMultiSelector from '../subjectsList/SubjectsMultiSelector';
import useTeacherUpdater from '../../hooks/useTeacherUpdater';

export default function TeachersList({
  teachers,
  classes,
  subjects,
  // onTeacherTransfer,
  // onClassChange,
  onAddTeacher,
  onDelTeacher,
  onUpdTeacherClasses,
  onUpdTeacherSubject,
}) {
  const [teacherName, setTeacherName] = useState('');
  const handleKeyDown = useEnterKeyHandler(handleAddTeacher);

  // function handleDragEnd(event) {
  //   const { active, over } = event;

  //   if (!active || !over) {
  //     console.warn('Drag operation failed: missing active or over element.');
  //     return;
  //   }

  //   if (active.id.startsWith('teacher-') && over.id.startsWith('class-')) {
  //     const teacherId = parseInt(active.id.replace('teacher-', ''), 10);
  //     const newClassId = parseInt(over.id.replace('class-', ''), 10);

  //     console.log(`Teacher ${teacherId} moved to class ${newClassId}`);
  //     onTeacherTransfer(teacherId, newClassId);
  //   } else {
  //     console.warn('Invalid drag operation.');
  //   }
  // }
  const teacherUpd = useTeacherUpdater(
    teachers,
    subjects,
    onUpdTeacherClasses,
    onUpdTeacherSubject
  );
  const handleClassChange = teacherUpd('classes');
  const handleSubjectChange = teacherUpd('subjects');

  function handleAddTeacher() {
    const tName = teacherName.trim();
    if (!tName) {
      console.warn('Teacher name cannot be empty');
      return;
    }
    if (teachers.some(t => t.name === tName)) {
      console.warn('Teacher with this name already exists');
    }
    onAddTeacher(teacherName.trim());
    setTeacherName('');
  }

  return (
    <>
      <div className={style.teachersContainer}>
        <h2>Teachers</h2>

        <div className={style.inputContainer}>
          <input
            placeholder="Add teacher"
            value={teacherName}
            onChange={e => setTeacherName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTeacher} className={style.addButton}>
            Add Teacher
          </button>
        </div>

        <table className={style.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subjects</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id} className={style.row}>
                <td>
                  <span className={style.itemNumber}>{index + 1}</span>
                </td>
                <td>
                  <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
                </td>
                <td>
                  <SubjectsMultiSelector
                    subjects={teacher.subjects || []}
                    onChange={updSubjectsIds => handleSubjectChange(teacher.id, updSubjectsIds)}
                  />
                </td>
                <td>
                  <ClassesMultiSelector
                    classes={classes}
                    selectedClassIds={teacher.classIds}
                    onChange={updClassIds => handleClassChange(teacher.id, updClassIds, false)}
                    // currentClassIds={teacher.classIds}
                    // onChange={newClassId => onClassChange(teacher.id, newClassId, false)}
                  />
                </td>
                <td>
                  <button onClick={() => onDelTeacher(teacher.id)} className={style.deleteButton}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className={style.teachersContainer}>
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
        </div> */}
      </div>
    </>
  );
}
