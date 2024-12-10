import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from '../selects/MultiSelect';
import { addTeachersToClass, removeTeacherFromClass } from './redux/teachersClassesSlice';
import { useState, useMemo } from 'react';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';
import SelectOptionsToText from '../selects/SelectOptionsToText';
import style from './index.module.scss';
import { DndContext } from '@dnd-kit/core';
import Draggable from '../../utils/dnd/Draggable';
import Droppable from '../../utils/dnd/Droppable';

export default function ClassesTeachers() {
  const dispatch = useDispatch();
  const [editingClassId, setEditingClassId] = useState(null);

  const classes = useSelector(state => state.classes.classes || []);
  const teachers = useSelector(state => state.teachers.teachers || []);
  const teachersClasses = useSelector(state => state.teachersClasses.teachersClasses || []);

  const getTeachersForClass = useMemo(() => {
    const teachersByClass = {};
    teachersClasses.forEach(tc => {
      if (!teachersByClass[tc.classId]) {
        teachersByClass[tc.classId] = [];
      }
      const teacher = teachers.find(t => t.id === tc.teacherId);
      if (teacher) {
        teachersByClass[tc.classId].push(teacher);
      }
    });
    return teachersByClass;
  }, [teachersClasses, teachers]);

  const handleAddTeachers = (selectedTeachers, classId) => {
    const currentTeachers = teachersClasses.filter(tc => tc.classId === classId);

    currentTeachers.forEach(tc => {
      const isTeacherSelected = selectedTeachers.some(teacher => teacher.value === tc.teacherId);
      if (!isTeacherSelected) {
        dispatch(removeTeacherFromClass({ classId, teacherId: tc.teacherId }));
      }
    });

    selectedTeachers.forEach(teacher => {
      const isTeacherAlreadyAdded = currentTeachers.some(tc => tc.teacherId === teacher.value);
      if (!isTeacherAlreadyAdded) {
        dispatch(addTeachersToClass({ classId, teacherId: teacher.value }));
      }
    });
  };

  const teacherOptions = teachers.map(teacher => ({
    label: teacher.name,
    value: teacher.id,
  }));

  const handleDragEnd = event => {
    const { active, over } = event;

    if (!active || !over) return;

    const activeTeacherId = active.id;
    const newClassId = over.id;

    const teacherAlreadyInClass = teachersClasses.some(
      tc => tc.teacherId === activeTeacherId && tc.classId === newClassId
    );

    if (teacherAlreadyInClass) return;

    dispatch(removeTeacherFromClass({ classId: active.id, teacherId: activeTeacherId }));
    dispatch(addTeachersToClass({ classId: newClassId, teacherId: activeTeacherId }));
  };

  const getSelectedTeachers = classId => {
    return teachersClasses
      .filter(tc => tc.classId === classId)
      .map(tc => {
        const teacher = teachers.find(t => t.id === tc.teacherId);
        return teacher ? { label: teacher.name, value: teacher.id } : null;
      })
      .filter(Boolean);
  };

  return (
    <div className={style.container}>
      <h3>Classes & Teachers</h3>
      <DndContext onDragEnd={handleDragEnd}>
        <ul className={style.list}>
          {classes.map(classItem => {
            const classTeachers = getTeachersForClass[classItem.id] || [];

            return (
              <li key={classItem.id} className={style.itemLink}>
                <Droppable id={classItem.id}>
                  <div className={style.classHeader}>
                    <h3>{classItem.name}</h3>
                    <span className={style.teachersList}>
                      <SelectOptionsToText selectedOptions={getSelectedTeachers(classItem.id)} />
                    </span>
                    <EditCloseSelectButton
                      isEditing={editingClassId === classItem.id}
                      onToggleEdit={() =>
                        setEditingClassId(prevId => (prevId === classItem.id ? null : classItem.id))
                      }
                    />
                  </div>
                  {editingClassId === classItem.id && (
                    <MultiSelect
                      value={getSelectedTeachers(classItem.id)}
                      onChange={selectedTeachers =>
                        handleAddTeachers(selectedTeachers, classItem.id)
                      }
                      options={teacherOptions}
                      placeholder="Select teachers"
                    />
                  )}
                  <div className={style.teachersForClass}>
                    <ul>
                      {classTeachers.length > 0 ? (
                        classTeachers.map(teacher => (
                          <li key={teacher.id}>
                            <Draggable id={teacher.id}>{teacher.name}</Draggable>
                          </li>
                        ))
                      ) : (
                        <li>No teachers assigned to this class</li>
                      )}
                    </ul>
                  </div>
                </Droppable>
              </li>
            );
          })}
        </ul>
      </DndContext>
    </div>
  );
}
