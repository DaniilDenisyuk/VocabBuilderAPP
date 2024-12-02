//SchoolManagement.jsx
import { useCallback, useState } from 'react';
import ClassesList from '../classesList/ClassesList';
import PupilsList from '../pupilsList/PupilsList';
import TeachersList from '../teachersList/TeachersList';
import { produce } from 'immer';
import style from './index.module.scss';
import ClassesTeachersPupils from '../classesTeachersPupils/ClassesTeachersPupils';
import Tabs from '../../atoms/tabs/Tabs';
import ClassesTeachers from '../classesTeachersPupils/ClassesTeachers';
import ClassesPupils from '../classesTeachersPupils/ClassesPupils';
import { DndContext } from '@dnd-kit/core';
import SubjectsList from '../subjectsList/SubjectsList';
const initialState = {
  classes: [
    { id: 1, name: '1-A', teacherIds: [], pupilIds: [] },
    { id: 2, name: '2-A', teacherIds: [], pupilIds: [] },
    { id: 3, name: '3-A', teacherIds: [], pupilIds: [] },
  ],
  teachers: [
    { id: 1, name: 'Teacher1', classIds: [] },
    { id: 2, name: 'Teacher2', classIds: [] },
    { id: 3, name: 'Teacher3', classIds: [] },
  ],
  subjects: [
    { id: 1, name: 'Math' },
    { id: 2, name: 'physics' },
    { id: 3, name: ' art' },
    { id: 3, name: ' history' },
    { id: 3, name: ' biology ' },
    { id: 3, name: 'chemistry' },
    { id: 3, name: 'language' },
  ],

  pupils: [
    { id: 1, name: 'Pupil1', classId: 0 },
    { id: 2, name: 'Pupil2', classId: 0 },
    { id: 3, name: 'Pupil3', classId: 0 },
    { id: 4, name: 'Pupil4', classId: 0 },
    { id: 5, name: 'Pupil5', classId: 0 },
    { id: 6, name: 'Pupil6', classId: 0 },
    { id: 7, name: 'Pupil7', classId: 0 },
    { id: 8, name: 'Pupil8', classId: 0 },
    { id: 9, name: 'Pupil9', classId: 0 },
  ],
};

export default function SchoolManagement() {
  const [state, setState] = useState(initialState);
  const { classes, teachers, pupils, subjects } = state;
  const [currentTab, setCurrentTab] = useState('classesTeachersPupils');
  const tabs = [
    {
      label: 'Classes & Teachers & Pupils',
      key: 'classesTeachersPupils',
      content: (
        <ClassesTeachersPupils
          class="content active"
          classes={classes}
          teachers={teachers}
          subjects={subjects}
          pupils={pupils}
        />
      ),
    },
    {
      label: 'Classes & Teachers',
      key: 'classesTeachers',
      content: <ClassesTeachers classes={classes} teachers={teachers} subjects={subjects} />,
    },
    {
      label: 'Classes & Pupils',
      key: 'classesPupils',
      content: <ClassesPupils classes={classes} pupils={pupils} />,
    },
  ];

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
  const handleAddItem = useCallback((field, itemName) => {
    setState(
      produce(draft => {
        const newId = draft[field].length + 1;
        draft[field].push({ id: newId, name: itemName.trim() });
      })
    );
  }, []);

  const handleDelItem = useCallback((field, itemId) => {
    setState(
      produce(draft => {
        draft[field] = draft[field].filter(item => item.id !== itemId);
      })
    );
  }, []);

  const handleUpdItem = useCallback((field, itemId, updData) => {
    setState(
      produce(draft => {
        const item = draft[field].find(item => item.id === itemId);
        if (item) Object.assign(item, updData);
      })
    );
  }, []);

  //!Object.assign(target, ...sources)-це метод JavaScript, який копіює всі власні 'лише переліки' (enumerable) властивості з одного або більше  об'єктів до цільового об'єкта.
  //!Якщо в об'єктів джерел є однакові властивості, значення з останнього об'єкта перезаписує попереднє.
  //!Не здійснює глибокого копіювання. Якщо властивість є об'єктом, то копіюється лише посилання на цей об'єкт.
  //target -цільовий об'єкт, в який будуть скопійовані властивості
  //sources- один або кілька об'єктів, властивості яких будуть скопійовані до цільового об'єкта
  //const target = { a: 1 };
  //const source = { b: 2, c: 3 };
  // Object.assign(target, source);
  // console.log(target); // { a: 1, b: 2, c: 3 }

  const handleDragEnd = useCallback(
    event => {
      const { active, over } = event;

      if (!active || !over) {
        console.log('Drop failed: no valid target.');
        return;
      }

      const itemId = active.id.split('-')[1];
      const newClassId = parseInt(over.id.replace('class-', ''), 10);

      if (active.id.startsWith('pupil-')) {
        handlePupilTransfer(parseInt(itemId, 10), newClassId);
      }

      if (active.id.startsWith('teacher-')) {
        handleTeacherCopy(parseInt(itemId, 10), newClassId);
      }
    },
    [handlePupilTransfer, handleTeacherCopy]
  );

  // const handleClassChange = (itemId, updClassIds, isPupil) => {
  //   // перевірка на наявність класу
  //   if (!state.classes.some(cl => cl.id === updClassIds)) {
  //     console.error(`Class ID ${updClassIds} not found`);
  //     return;
  //   }

  //   setState(
  //     produce(draft => {
  //       const item = isPupil
  //         ? draft.pupils.find(p => p.id === itemId) // шукаємо учня
  //         : draft.teachers.find(t => t.id === itemId); // шукаємо вчителя

  //       if (item) {
  //         // оновлення для учня
  //         if (isPupil) {
  //           const oldClass = draft.classes.find(cl => cl.id === item.classId);
  //           if (oldClass) {
  //             // видалення учня з попереднього класу
  //             oldClass.pupilIds = oldClass.pupilIds.filter(id => id !== itemId);
  //           }
  //           item.classId = updClassIds;
  //         }
  //         // оновлення для вчителя
  //         else {
  //           if (!item.classIds.includes(updClassIds)) {
  //             // додавання класу вчителю
  //             item.classIds.push(updClassIds);
  //           }
  //         }

  //         // додавання до нового класу
  //         const newClass = draft.classes.find(cl => cl.id === updClassIds);
  //         if (newClass) {
  //           if (isPupil && !newClass.pupilIds.includes(itemId)) {
  //             // додавання учня в новий клас
  //             newClass.pupilIds.push(itemId);
  //           } else if (!isPupil && !newClass.teacherIds.includes(itemId)) {
  //             // додавання вчителя в новий клас
  //             newClass.teacherIds.push(itemId);
  //           }
  //         }
  //       }
  //     })
  //   );
  // };
  return (
    <>
      <h1>School Management</h1>

      <div className={style.listsContainer}>
        <TeachersList
          classes={classes}
          teachers={teachers}
          subjects={subjects}
          onTransfer={handlePupilTransfer}
          onAddTeacher={name => handleAddItem('teachers', name)}
          onDelTeacher={id => handleDelItem('teachers', id)}
          onClassChange={(teacherId, newClassId) =>
            handleUpdItem('teachers', teacherId, { classId: newClassId })
          }
          onUpdTeacherClasses={(teacherId, updClasses) =>
            handleUpdItem('teachers', teacherId, { classIds: updClasses })
          }
          onUpdSubject={(subjectId, updData) => handleUpdItem('subjects', subjectId, updData)}
        />
        <PupilsList
          classes={classes}
          pupils={pupils}
          onTransfer={handlePupilTransfer}
          onAddPupil={name => handleAddItem('pupils', name)}
          onDelPupil={id => handleDelItem('pupils', id)}
          onClassChange={(pupilId, newClassId) =>
            handleUpdItem('pupils', pupilId, { classId: newClassId })
          }
        />
        <ClassesList
          classes={classes}
          pupils={pupils}
          teachers={teachers}
          onAddClass={name => handleAddItem('classes', name)}
          onDelClass={id => handleDelItem('classes', id)}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
        <SubjectsList
          subjects={subjects}
          pupils={pupils}
          teachers={teachers}
          onAddSubject={name => handleAddItem('subject', name)}
          onDelSubject={id => handleDelItem('subject', id)}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
      </div>
      <div className={style.tabContainer}>
        <h2>Classes & Teachers & Pupils</h2>
        <div>
          <DndContext onDragEnd={handleDragEnd}>
            <Tabs tabs={tabs} activeKey={currentTab} onChange={key => setCurrentTab(key)} />
          </DndContext>
        </div>
      </div>
    </>
  );
}
