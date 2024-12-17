import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import style from './index.module.scss';
import MultiSelect from '../selects/MultiSelect';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';
import SelectOptionsToText from '../selects/SelectOptionsToText';
import { addTeacherToClass, removeTeacherFromClass } from './redux/classesTeachersSlice';

export default function ClassesWithTeachers() {
  const dispatch = useDispatch();
  const [editingClassId, setEditingClassId] = useState(null);

  const classes = useSelector(state => state.classes.classes);
  const teachers = useSelector(state => state.teachers.teachers);
  const classesTeachers = useSelector(state => state.classesTeachers.classesTeachers);

  const handleTeacherSelectionChange = useCallback(
    (selectedTeachers, classId) => {
      const selectedTeacherIds = selectedTeachers.map(teacher => teacher.value);

      const currentClass = classesTeachers.find(ct => ct.classId === classId);
      const currentTeacherIds = currentClass?.teacherIds || [];

      const teachersToAdd = selectedTeacherIds.filter(id => !currentTeacherIds.includes(id));
      const teachersToRemove = currentTeacherIds.filter(id => !selectedTeacherIds.includes(id));

      if (teachersToAdd.length) {
        dispatch(addTeacherToClass({ classId, teacherIds: teachersToAdd }));
      }
      if (teachersToRemove.length) {
        dispatch(removeTeacherFromClass({ classId, teacherIds: teachersToRemove }));
      }
    },
    [dispatch, classesTeachers]
  );

  const teacherOptions = useMemo(() => {
    return teachers.map(teacherItem => ({
      label: teacherItem.name,
      value: teacherItem.id,
    }));
  }, [teachers]);

  const getSelectedTeachers = useCallback(
    classId => {
      const classTeachers = classesTeachers.find(ct => ct.classId === classId);
      if (!classTeachers) return [];

      return classTeachers.teacherIds
        .map(teacherId => {
          const teacherItem = teachers.find(teacher => teacher.id === teacherId);
          return teacherItem ? { label: teacherItem.name, value: teacherItem.id } : null;
        })
        .filter(Boolean);
    },
    [teachers, classesTeachers]
  );
  if (!classes || !teachers || !classesTeachers) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Classes with teachers</h2>
      <div>
        <ol>
          {classes.map(classItem => (
            <li key={classItem.id} className={style.classItem}>
              <div>
                <span>
                  {classItem.name}:
                  <span className={style.teachersList}>
                    <SelectOptionsToText selectedOptions={getSelectedTeachers(classItem.id)} />
                  </span>
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
                    handleTeacherSelectionChange(selectedTeachers, classItem.id)
                  }
                  options={teacherOptions}
                  placeholder="Select teachers"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
