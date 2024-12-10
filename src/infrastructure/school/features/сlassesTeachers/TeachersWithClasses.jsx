import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { addTeachersToClass, removeTeacherFromClass } from './redux/teachersClassesSlice';
import MultiSelect from '../selects/MultiSelect';
import style from './index.module.scss';
import SelectOptionsToText from '../selects/SelectOptionsToText';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';

export default function TeachersWithClasses() {
  const dispatch = useDispatch();
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  const teachers = useSelector(state => state.teachers.teachers);
  const classes = useSelector(state => state.classes.classes);
  const teachersClasses = useSelector(state => state.teachersClasses.teachersClasses);

  const handleClassSelectionChange = useCallback(
    (selectedClasses, teacherId) => {
      const currentClasses = teachersClasses.filter(tc => tc.teacherId === teacherId);

      selectedClasses.forEach(selected => {
        if (!currentClasses.some(tc => tc.classId === selected.value)) {
          dispatch(addTeachersToClass({ teacherId, classId: selected.value }));
        }
      });

      currentClasses.forEach(tc => {
        if (!selectedClasses.some(sc => sc.value === tc.classId)) {
          dispatch(removeTeacherFromClass({ teacherId, classId: tc.classId }));
        }
      });
    },
    [dispatch, teachersClasses]
  );

  const classOptions = classes.map(classItem => ({
    label: classItem.name,
    value: classItem.id,
  }));

  const getSelectedClasses = teacherId => {
    return teachersClasses
      .filter(tc => tc.teacherId === teacherId)
      .map(tc => {
        const classItem = classes.find(cl => cl.id === tc.classId);
        if (!classItem) {
          return null;
        }
        return { label: classItem.name, value: classItem.id };
      })
      .filter(Boolean);
  };

  if (!teachers || !classes || !teachersClasses) {
    return <div>Loading...</div>;
  }

  const toggleEditMode = teacherId => {
    setEditingTeacherId(prevId => (prevId === teacherId ? null : teacherId));
  };
  return (
    <>
      <h2>Teachers with their classes</h2>
      <div>
        <ol>
          {teachers.map(teacher => (
            <li key={teacher.id} className={style.teacherItem}>
              <div>
                <span>
                  {teacher.name}:
                  <span className={style.classesList}>
                    <SelectOptionsToText selectedOptions={getSelectedClasses(teacher.id)} />
                  </span>
                </span>
                <EditCloseSelectButton
                  isEditing={editingTeacherId === teacher.id}
                  onToggleEdit={() => toggleEditMode(teacher.id)}
                />
              </div>
              {editingTeacherId === teacher.id && (
                <MultiSelect
                  value={getSelectedClasses(teacher.id)}
                  onChange={selectedClasses =>
                    handleClassSelectionChange(selectedClasses, teacher.id)
                  }
                  options={classOptions}
                  placeholder="Select classes"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
