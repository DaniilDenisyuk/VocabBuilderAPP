import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './index.module.scss';
import SelectOptionsToText from '../selects/SelectOptionsToText';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';
import MultiSelect from '../selects/MultiSelect';
import { addTeacherToClass, removeTeacherFromClass } from './redux/teachersClassesSlice';

export default function TeachersWithClasses() {
  const dispatch = useDispatch();
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  const teachers = useSelector(state => state.teachers.teachers || []);
  const classes = useSelector(state => state.classes.classes || []);
  const teachersClasses = useSelector(state => state.teachersClasses.teachersClasses || []);

  console.log('Teachers:', teachers);
  console.log('Classes:', classes);
  console.log('Teachers Classes:', teachersClasses);

  const handleClassSelectionChange = useCallback(
    (selectedClasses, teacherId) => {
      const selectedClassIds = selectedClasses.map(cl => cl.value);

      console.log(`Selected classes for teacher ${teacherId}:`, selectedClassIds);

      const currentTeacher = teachersClasses.find(tc => tc.teacherId === teacherId);
      const currentClassIds = currentTeacher?.classIds || [];

      console.log(`Current classes for teacher ${teacherId}:`, currentClassIds);

      const classesToAdd = selectedClassIds.filter(id => !currentClassIds.includes(id));
      const classesToRemove = currentClassIds.filter(id => !selectedClassIds.includes(id));

      console.log('Classes to add:', classesToAdd);
      console.log('Classes to remove:', classesToRemove);

      if (classesToAdd.length > 0) {
        console.log('Dispatching addTeacherToClass with:', { teacherId, classIds: classesToAdd });
        dispatch(addTeacherToClass({ teacherId, classIds: classesToAdd }));
      }

      if (classesToRemove.length > 0) {
        console.log('Dispatching removeTeacherFromClass with:', {
          teacherId,
          classIds: classesToRemove,
        });
        dispatch(removeTeacherFromClass({ teacherId, classIds: classesToRemove }));
      }
    },
    [dispatch, teachersClasses]
  );

  const classOptions = useMemo(() => {
    const options = classes.map(classItem => ({
      label: classItem.name,
      value: classItem.id,
    }));
    console.log('Class options:', options);
    return options;
  }, [classes]);

  const getSelectedClasses = useCallback(
    teacherId => {
      const teacherClasses = teachersClasses.find(rel => rel.teacherId === teacherId);
      const selectedClasses = (teacherClasses?.classIds || [])
        .map(classId => {
          const classItem = classes.find(cl => cl.id === classId);
          return classItem ? { label: classItem.name, value: classItem.id } : null;
        })
        .filter(Boolean);

      return selectedClasses;
    },
    [classes, teachersClasses]
  );

  if (!classes || !teachers || !teachersClasses) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Teachers with Classes</h2>
      <div>
        <ol>
          {teachers.map(teacher => (
            <li key={teacher.id} className={style.teacher}>
              <div>
                <span>
                  {teacher.name}:
                  <span className={style.classesList}>
                    <SelectOptionsToText selectedOptions={getSelectedClasses(teacher.id)} />
                  </span>
                </span>
                <EditCloseSelectButton
                  isEditing={editingTeacherId === teacher.id}
                  onToggleEdit={() => {
                    console.log('Toggling edit mode for teacher', teacher.id);
                    setEditingTeacherId(prevId => (prevId === teacher.id ? null : teacher.id));
                  }}
                />
              </div>
              {editingTeacherId === teacher.id && (
                <MultiSelect
                  value={getSelectedClasses(teacher.id)}
                  onChange={selectedClasses => {
                    console.log('MultiSelect value changed:', selectedClasses);
                    handleClassSelectionChange(selectedClasses, teacher.id);
                  }}
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
