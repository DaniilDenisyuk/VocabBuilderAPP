import { useState } from 'react';
import ClassesList from './classesList/ClassesList';
import PupilsList from './pupilsList/PupilsList';
import TeachersList from './teachersList/TeachersList';
import { produce } from 'immer';

const initialState = {
  classes: [
    { id: 1, name: '1-A', teacherIds: [], pupilIds: [] },
    { id: 2, name: '2-A', teacherIds: [], pupilIds: [] },
    { id: 3, name: '3-A', teacherIds: [], pupilIds: [] },
  ],
  teachers: [
    { id: 1, name: 'Teacher 1', classIds: [] },
    { id: 2, name: 'Teacher 2', classIds: [] },
    { id: 3, name: 'Teacher 3', classIds: [] },
  ],
  pupils: [
    { id: 1, name: 'Pupil 1', classId: 0 },
    { id: 2, name: 'Pupil 2', classId: 0 },
    { id: 3, name: 'Pupil 3', classId: 0 },
    { id: 4, name: 'Pupil 4', classId: 0 },
    { id: 5, name: 'Pupil 5', classId: 0 },
    { id: 6, name: 'Pupil 6', classId: 0 },
    { id: 7, name: 'Pupil 7', classId: 0 },
    { id: 8, name: 'Pupil 8', classId: 0 },
    { id: 9, name: 'Pupil 9', classId: 0 },
  ],
};

export default function SchoolManagement() {
  const [state, setState] = useState(initialState);
  const { classes, teachers, pupils } = state;

  const handlePupilTransfer = (pupilId, newClassId) => {
    setState(prevState => {
      const updatedPupils = prevState.pupils.map(pupil =>
        pupil.id === pupilId ? { ...pupil, classId: newClassId } : pupil
      );
      return { ...prevState, pupils: updatedPupils };
    });
  };

  const handleTeacherCopy = (teacherId, newClassId) => {
    setState(prevState => {
      const updatedTeachers = prevState.teachers.map(teacher => {
        if (teacher.id === teacherId && !teacher.classIds.includes(newClassId)) {
          return { ...teacher, classIds: [...teacher.classIds, newClassId] };
        }
        return teacher;
      });
      return { ...prevState, teachers: updatedTeachers };
    });
  };

  //produce з бібліотеки immer для оновлення стану
  const handleAddClass = className => {
    setState(
      produce(draft => {
        const newClassId = draft.classes.length + 1;
        draft.classes.push({
          id: newClassId,
          name: className.trim(),
          teacherIds: [],
          pupilIds: [],
        });
      })
    );
  };

  const handleDelClass = classId => {
    setState(
      produce(draft => {
        draft.classes = draft.classes.filter(cl => cl.id !== classId);
      })
    );
  };

  const handleAddTeacher = teacherName => {
    setState(prevState =>
      produce(prevState, draft => {
        draft.teachers.push({
          id: draft.teachers.length + 1,
          name: teacherName.trim(),
          classIds: [],
        });
      })
    );
  };

  const handleDelTeacher = teacherId => {
    setState(prevState =>
      produce(prevState, draft => {
        draft.teachers = draft.teachers.filter(t => t.id !== teacherId);
      })
    );
  };

  const handleAddPupil = pupilName => {
    setState(prevState =>
      produce(prevState, draft => {
        draft.pupils.push({
          id: draft.pupils.length + 1,
          name: pupilName.trim(),
          classId: 0,
        });
      })
    );
  };

  const handleDelPupil = pupilId => {
    setState(prevState =>
      produce(prevState, draft => {
        draft.pupils = draft.pupils.filter(p => p.id !== pupilId);
      })
    );
  };

  const handleClassChange = (itemId, newClassId, isPupil) => {
    // чи знайдено клас
    if (!state.classes.some(cl => cl.id === newClassId)) {
      console.error(`Class ID ${newClassId} not found`);
      return;
    }
    setState(
      produce(draft => {
        if (isPupil) {
          // оновити classId учня
          const pupil = draft.pupils.find(p => p.id === itemId);
          if (pupil) {
            const oldClass = draft.classes.find(cl => cl.id === pupil.classId);
            if (oldClass) {
              oldClass.pupilIds = oldClass.pupilIds.filter(id => id !== itemId); // видалити учня з попереднього класу
            }
            pupil.classId = newClassId;
            const newClass = draft.classes.find(cl => cl.id === newClassId);
            if (newClass && !newClass.pupilIds.includes(itemId)) {
              newClass.pupilIds.push(itemId); // додати учня в новий клас
            }
          }
        } else {
          // оновити classIds вчителя
          const teacher = draft.teachers.find(t => t.id === itemId);
          if (teacher && !teacher.classIds.includes(newClassId)) {
            teacher.classIds.push(newClassId);

            // додати teacherId до нового класу
            const newClass = draft.classes.find(cl => cl.id === newClassId);
            if (newClass && !newClass.teacherIds.includes(itemId)) {
              newClass.teacherIds.push(itemId);
            }
          }
        }
      })
    );
  };

  return (
    <div>
      <h1>School Management</h1>
      <TeachersList
        classes={classes}
        teachers={teachers}
        onTransfer={handlePupilTransfer}
        onClassChange={handleClassChange}
        onAddTeacher={handleAddTeacher}
        onDelTeacher={handleDelTeacher}
      />
      <PupilsList
        classes={classes}
        pupils={pupils}
        onTransfer={handlePupilTransfer}
        onClassChange={handleClassChange}
        onAddPupil={handleAddPupil}
        onDelPupil={handleDelPupil}
      />
      <ClassesList
        classes={classes}
        pupils={pupils}
        teachers={teachers}
        onAddClass={handleAddClass}
        onDelClass={handleDelClass}
        onPupilTransfer={handlePupilTransfer}
        onTeacherCopy={handleTeacherCopy}
      />
    </div>
  );
}
