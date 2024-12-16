import style from './index.module.scss';
import { useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transferPupil } from '../../features/classesPupils/redux/pupilsClassesSlice';
import { copyTeacher } from '../../components/teachersList/redux/teachersSlice';
import Tabs from '../../utils/tabs/Tabs';
import ClassesWithPupils from '../../features/classesPupils/ClassesWithPupils';
import RelationshipTable from '../../features/teacherClassSubjectTable/relationshipTable/RelationshipTable';
import TeachersWithSubjects from '../../features/teacherSubject/TeachersWithSubjects';
import ClassesWithTeachers from '../../features/сlassesTeachers/ClassesWithTeachers';
import TeachersWithClasses from '../../features/teachersClasses/TeachersWithClasses';
import ClassesWithSubjects from '../../features/classesSubject/ClassesWithSubjects';
// import AllRelationshipTable from '../../features/teacherClassSubjectTable/relationshipTable/AllRelationshipTable';

export default function TabsPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useSelector(state => state.classes);
  const teachers = useSelector(state => state.teachers);
  const subjects = useSelector(state => state.subjects);
  const pupils = useSelector(state => state.pupils);
  const classesTeachers = useSelector(state => state.relations.relations);
  const teachersClasses = useSelector(state => state.relations.relations);
  const classesSubjects = useSelector(state => state.relations.relations);

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
      content: useMemo(
        () => (
          <ClassesWithPupils
            classes={classes}
            pupils={pupils}
            onPupilTransfer={handlePupilTransfer}
            onTeacherCopy={handleTeacherCopy}
          />
        ),
        [classes, pupils]
      ),
    },
    {
      label: 'Classes & Teachers',
      key: 'classTeacher',
      content: (
        <ClassesWithTeachers
          classes={classes}
          teachers={teachers}
          classesTeachers={classesTeachers}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
      ),
    },
    {
      label: 'Classes & Subject',
      key: 'classSubject',
      content: (
        <ClassesWithSubjects
          classes={classes}
          subjects={subjects}
          classesSubjects={classesSubjects}
          onPupilTransfer={handlePupilTransfer}
          onTeacherCopy={handleTeacherCopy}
        />
      ),
    },

    {
      label: 'Teachers With Classes',
      key: 'teachersWithClasses',
      content: (
        <TeachersWithClasses
          classes={classes}
          teachers={teachers}
          teachersClasses={teachersClasses}
        />
      ),
    },
    {
      label: 'Teachers With Subjects',
      key: 'teachersWithSubjects',
      content: <TeachersWithSubjects subjects={subjects} teachers={teachers} />,
    },
    {
      label: 'Subjects With Classes',
      key: 'subjectsWithClasses',
      content: <ClassesWithSubjects subjects={subjects} classes={classes} />,
    },

    // {
    //   label: 'AllRelationshipTable',
    //   key: 'teacherClassSubjectTable',
    //   content: <AllRelationshipTable classes={classes} pupils={pupils} teachers={teachers} />,
    // },
    {
      label: 'RelationshipTable',
      key: 'allTeacherClassSubjectTable',
      content: <RelationshipTable classes={classes} pupils={pupils} teachers={teachers} />,
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
