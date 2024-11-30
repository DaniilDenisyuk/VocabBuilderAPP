//SchoolManagement.jsx
import { useState } from 'react';
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
  const { classes, teachers, pupils } = state;
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
          pupils={pupils}
        />
      ),
    },
    {
      label: 'Classes & Teachers',
      key: 'classesTeachers',
      content: <ClassesTeachers classes={classes} teachers={teachers} />,
    },
    {
      label: 'Classes & Pupils',
      key: 'classesPupils',
      content: <ClassesPupils classes={classes} pupils={pupils} />,
    },
  ];
  const handleDragEnd = event => {
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
  };

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

  const handleClassChange = (itemId, updClassIds, isPupil) => {
    // перевірка на наявність класу
    if (!state.classes.some(cl => cl.id === updClassIds)) {
      console.error(`Class ID ${updClassIds} not found`);
      return;
    }

    setState(
      produce(draft => {
        const item = isPupil
          ? draft.pupils.find(p => p.id === itemId) // шукаємо учня
          : draft.teachers.find(t => t.id === itemId); // шукаємо вчителя

        if (item) {
          // оновлення для учня
          if (isPupil) {
            const oldClass = draft.classes.find(cl => cl.id === item.classId);
            if (oldClass) {
              oldClass.pupilIds = oldClass.pupilIds.filter(id => id !== itemId); // видалення учня з попереднього класу
            }
            item.classId = updClassIds;
          }
          // оновлення для вчителя
          else {
            if (!item.classIds.includes(updClassIds)) {
              item.classIds.push(updClassIds); // додавання класу вчителю
            }
          }

          // додавання до нового класу
          const newClass = draft.classes.find(cl => cl.id === updClassIds);
          if (newClass) {
            if (isPupil && !newClass.pupilIds.includes(itemId)) {
              newClass.pupilIds.push(itemId); // додавання учня в новий клас
            } else if (!isPupil && !newClass.teacherIds.includes(itemId)) {
              newClass.teacherIds.push(itemId); // додавання вчителя в новий клас
            }
          }
        }
      })
    );
  };
  const handleUpdTeacherClasses = (teacherId, updatedClassIds) => {
    setState(prevState => {
      const updatedTeachers = prevState.teachers.map(teacher => {
        if (teacher.id === teacherId) {
          return { ...teacher, classIds: updatedClassIds };
        }
        return teacher;
      });
      return { ...prevState, teachers: updatedTeachers };
    });
  };
  return (
    <>
      <h1>School Management</h1>

      <div className={style.listsContainer}>
        <TeachersList
          classes={classes}
          teachers={teachers}
          onTransfer={handlePupilTransfer}
          onClassChange={handleClassChange}
          onAddTeacher={handleAddTeacher}
          onDelTeacher={handleDelTeacher}
          onUpdTeacherClasses={handleUpdTeacherClasses}
          // selectedItems={selectedItems.teachers}
          // toggleSelection={id => toggleSelection('teachers', id)}
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
