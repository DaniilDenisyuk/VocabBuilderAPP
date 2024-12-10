import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import style from './index.module.scss';
import { addTeachersToSubject, removeTeacherFromSubject } from './redux/teacherSubjectSlice';
import MultiSelect from '../selects/MultiSelect';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';
import SelectOptionsToText from '../selects/SelectOptionsToText';

export default function TeachersWithSubjects() {
  const dispatch = useDispatch();

  const [editingTeacherId, setEditingTeacherId] = useState(null);

  const teachers = useSelector(state => state.teachers.teachers);
  const subjects = useSelector(state => state.subjects.subjects);
  const teachersSubjects = useSelector(state => state.teachersSubjects.teachersSubjects);

  const handleSubjectSelectionChange = useCallback(
    (selectedSubjects, teacherId) => {
      const currentSubjects = teachersSubjects.filter(ts => ts.teacherId === teacherId);

      selectedSubjects.forEach(selected => {
        if (!currentSubjects.some(ts => ts.subjectId === selected.value)) {
          dispatch(addTeachersToSubject({ teacherId, subjectId: selected.value }));
        }
      });

      currentSubjects.forEach(ts => {
        if (!selectedSubjects.some(sc => sc.value === ts.subjectId)) {
          dispatch(removeTeacherFromSubject({ teacherId, subjectId: ts.subjectId }));
        }
      });
    },
    [dispatch, teachersSubjects]
  );

  const subjectOptions = subjects.map(subjectItem => ({
    label: subjectItem.name,
    value: subjectItem.id,
  }));

  const getSelectedSubjects = teacherId => {
    return teachersSubjects
      .filter(ts => ts.teacherId === teacherId)
      .map(ts => {
        const subjectItem = subjects.find(sub => sub.id === ts.subjectId);
        return subjectItem ? { label: subjectItem.name, value: subjectItem.id } : null;
      })
      .filter(Boolean);
  };

  if (!teachers || !subjects || !teachersSubjects) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Teachers - subjects</h2>
      <div>
        <ol>
          {teachers.map(teacher => (
            <li key={teacher.id} className={style.teacherItem}>
              <div>
                <span>
                  {teacher.name}: {''}
                  <span className={style.subjectsList}>
                    <SelectOptionsToText selectedOptions={getSelectedSubjects(teacher.id)} />
                  </span>
                </span>
                <EditCloseSelectButton
                  isEditing={editingTeacherId === teacher.id}
                  onToggleEdit={() =>
                    setEditingTeacherId(prevId => (prevId === teacher.id ? null : teacher.id))
                  }
                />
              </div>
              {editingTeacherId === teacher.id && (
                <MultiSelect
                  value={getSelectedSubjects(teacher.id)}
                  onChange={selectedSubjects =>
                    handleSubjectSelectionChange(selectedSubjects, teacher.id)
                  }
                  options={subjectOptions}
                  placeholder="Select subjects"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
