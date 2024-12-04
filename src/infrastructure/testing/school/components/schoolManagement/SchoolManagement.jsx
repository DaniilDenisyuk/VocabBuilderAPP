//SchoolManagement.jsx
import { useState } from 'react';
import ClassesList from '../classesList/ClassesList';
import PupilsList from '../pupilsList/PupilsList';
import TeachersList from '../teachersList/TeachersList';
import style from './index.module.scss';
import ClassesTeachersPupils from '../classesTeachersPupils/ClassesTeachersPupils';
import Tabs from '../../atoms/tabs/Tabs';
import ClassesTeachers from '../classesTeachersPupils/ClassesTeachers';
import ClassesPupils from '../classesTeachersPupils/ClassesPupils';
import { DndContext } from '@dnd-kit/core';
import SubjectsList from '../subjectsList/SubjectsList';
import TeachersWithClasses from '../classesTeachersPupils/TeachersWithClasses';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, copyTeacher, deleteItem, transferPupil } from '../../redux/schoolSlice';
import { v4 as uuidv4 } from 'uuid';
import TeachersWithSubjects from '../classesTeachersPupils/TeachersWithSubjects';
import TeacherSubjects from '../teachersList/TeacherSubjects';

export default function SchoolManagement() {
  const dispatch = useDispatch();

  const school = useSelector(state => state.school);
  const { teachers, pupils, classes, subjects } = school;
  const [error, setError] = useState();
  const [currentTab, setCurrentTab] = useState('classesTeachersPupils');
  const [activeView, setActiveView] = useState('teachers');

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
    dispatch(transferPupil({ pupilId, newClassId }));
    // setState(prevState => {
    //   const updatedPupils = prevState.pupils.map(pupil =>
    //     pupil.id === pupilId ? { ...pupil, classId: newClassId } : pupil
    //   );
    //   return { ...prevState, pupils: updatedPupils };
    // });
  };

  const handleTeacherCopy = (teacherId, newClassId) => {
    dispatch(copyTeacher({ teacherId, newClassId }));
    // setState(prevState => {
    //   const updatedTeachers = prevState.teachers.map(teacher => {
    //     if (teacher.id === teacherId && !teacher.classIds.includes(newClassId)) {
    //       return { ...teacher, classIds: [...teacher.classIds, newClassId] };
    //     }
    //     return teacher;
    //   });
    //   return { ...prevState, teachers: updatedTeachers };
    // });
  };

  const tabs = [
    {
      label: 'Classes & Teachers & Pupils',
      key: 'classesTeachersPupils',
      content: (
        <ClassesTeachersPupils
          classes={classes}
          pupils={pupils}
          teachers={teachers}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
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
    {
      label: 'Teachers With Classes',
      key: 'teachersWithClasses',
      content: <TeachersWithClasses classes={classes} teachers={teachers} />,
    },
    {
      label: 'Teachers With Subjects',
      key: 'teachersWithSubjects',
      content: <TeachersWithSubjects subjects={subjects} teachers={teachers} />,
    },
  ];

  const handleAddItem = (field, name, additionalData = {}) => {
    if (!name.trim()) {
      setError(`${field} name cannot be empty`);
      return;
    }
    const list = school[field];
    if (list.some(item => item.name === name)) {
      setError(`${field} name must be unique`);
      return;
    }
    setError('');
    dispatch(addItem({ field, id: uuidv4(), name: name.trim(), ...additionalData }));
    // setState(
    //   produce(draft => {
    //     const newId = draft[field].length + 1;
    //     draft[field].push({ id: newId, name: itemName.trim() });
    //   })
    // );
  };

  const handleDelItem = (field, id) => {
    dispatch(deleteItem({ field, itemId: id }));
    // setState(
    //   produce(draft => {
    //     draft[field] = draft[field].filter(item => item.id !== itemId);
    //   })
    // );
  };

  // const handleUpdItem = useCallback((field, itemId, updData) => {
  //   updateState(
  //     produce(draft => {
  //       const item = draft[field].find(item => item.id === itemId);
  //       if (item) Object.assign(item, updData);
  //     })
  //   );
  // }, []);
  const showTeachers = () => setActiveView('teachers');
  const showSubjects = () => setActiveView('subjects');
  return (
    <>
      <h1>School Management</h1>
      {error && <div className={style.error}>{error}</div>}
      <div className={style.listsContainer}>
        <div>
          <button onClick={showTeachers} className={style.switchButton}>
            Teachers Classes
          </button>
          <button onClick={showSubjects} className={style.switchButton}>
            Teacher Subjects
          </button>
          {activeView === 'teachers' && (
            <TeachersList
              classes={classes}
              teachers={teachers}
              onAddTeacher={name => handleAddItem('teachers', name)}
              onDelTeacher={id => handleDelItem('classes', id)}
              onTransfer={handlePupilTransfer}
              // onClassChange={handleClassChange}
              // onUpdTeacherClasses={handleUpdTeacherClasses}
              // selectedSubjects={selectedSubjects}
              // onSubjectsChange={setSelectedSubjects}
            />
          )}
          {activeView === 'subjects' && (
            <TeacherSubjects
              teachers={teachers}
              subjects={subjects}
              onAddTeacher={name => handleAddItem('teachers', name)}
              onDelTeacher={id => handleDelItem('classes', id)}
              onTransfer={handlePupilTransfer}
            />
          )}
        </div>
        <PupilsList
          classes={classes}
          pupils={pupils}
          onTransfer={handlePupilTransfer}
          // onClassChange={handleClassChange}
          onAddPupil={name => handleAddItem('pupils', name)}
          onDelPupil={id => handleDelItem('pupils', id)}
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
          onAddSubject={name => handleAddItem('subjects', name)}
          onDelSubject={id => handleDelItem('subjects', id)}
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
