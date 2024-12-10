import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TeachersWithClasses from '../../features/сlassesTeachers/TeachersWithClasses';
import TeachersWithSubjects from '../../features/teacherSubject/TeachersWithSubjects';
import ClassesWithPupils from '../../features/classesPupils/ClassesWithPupils';
import ClassesTeachers from '../../features/сlassesTeachers/ClassesTeachers';

import Tabs from '../../utils/tabs/Tabs';

import style from './index.module.scss';
import TeacherClassSubjectTable from '../../features/teacherClassSubjectTable/TeacherClassSubjectTable';
import { transferPupil } from '../../features/classesPupils/redux/pupilsClassesSlice';
import { copyTeacher } from '../../features/teacherClassSubjectTable/redux/teachersClassesSubjectsSlice';

export default function TabsPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const school = useSelector(state => state.school);
  const { teachers, pupils, classes, subjects, teacherClass } = school;

  const [currentTab, setCurrentTab] = useState('classesPupils');

  const handleDragEnd = ({ active, over }) => {
    if (!active || !over) return;

    const itemId = active.id.split('-')[1];
    const newClassId = parseInt(over.id.replace('class-', ''), 10);

    if (active.id.startsWith('pupil-')) {
      handlePupilTransfer(parseInt(itemId, 10), newClassId);
    } else if (active.id.startsWith('teacher-')) {
      handleTeacherCopy(parseInt(itemId, 10), newClassId);
    }
  };

  const handlePupilTransfer = (pupilId, newClassId) => {
    dispatch(transferPupil({ pupilId, newClassId }));
  };

  const handleTeacherCopy = (teacherId, newClassId) => {
    dispatch(copyTeacher({ teacherId, newClassId }));
  };

  const handleClick = () => {
    navigate('/testing');
  };

  const tabs = [
    {
      label: 'Classes & Pupils',
      key: 'classesPupils',
      content: (
        <ClassesWithPupils
          classes={classes}
          pupils={pupils}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
      ),
    },
    {
      label: 'Classes & Teachers',
      key: 'classTeacher',
      content: (
        <ClassesTeachers
          teacherClass={teacherClass}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
      ),
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
    {
      label: 'Teacher & Class & Subject Table',
      key: 'teacherClassSubjectTable',
      content: <TeacherClassSubjectTable classes={classes} pupils={pupils} teachers={teachers} />,
    },
  ];

  return (
    <>
      <h2 onClick={handleClick} className={style.h2Link}>
        School Management
      </h2>
      <div className={style.tabContainer}>
        <DndContext onDragEnd={handleDragEnd}>
          <Tabs tabs={tabs} activeKey={currentTab} onChange={key => setCurrentTab(key)} />
        </DndContext>
      </div>
    </>
  );
}
