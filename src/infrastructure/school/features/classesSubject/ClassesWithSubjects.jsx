import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import style from './index.module.scss';
import { addSubjectsToClasses, removeSubjectsFromClasses } from './redux/classesSubjectsSlice';
import MultiSelect from '../selects/MultiSelect';
import EditCloseSelectButton from '../selects/EditCloseSelectButton';
import SelectOptionsToText from '../selects/SelectOptionsToText';

export default function ClassesWithSubjects() {
  const dispatch = useDispatch();

  const [editingClassesId, setEditingClassesId] = useState(null);

  const classes = useSelector(state => state.classes.classes || []);
  const subjects = useSelector(state => state.subjects.subjects || []);
  const classesSubjects = useSelector(state => state.classesSubjects?.classesSubjects || []);

  const handleSubjectSelectionChange = useCallback(
    (selectedSubjects, classId) => {
      const selectedSubjectIds = selectedSubjects.map(subject => subject.value);
      const currentClass = classesSubjects.find(cs => cs.classId === classId);
      const currentSubjectIds = currentClass?.subjectIds || [];
      const subjectsToAdd = selectedSubjectIds.filter(id => !currentSubjectIds.includes(id));
      const subjectsToRemove = currentSubjectIds.filter(id => !selectedSubjectIds.includes(id));

      if (subjectsToAdd.length) {
        dispatch(addSubjectsToClasses({ classId, subjectIds: subjectsToAdd }));
      }
      if (subjectsToRemove.length) {
        dispatch(removeSubjectsFromClasses({ classId, subjectIds: subjectsToRemove }));
      }
    },
    [dispatch, classesSubjects]
  );

  const subjectOptions = subjects.map(subjectItem => ({
    label: subjectItem.name,
    value: subjectItem.id,
  }));

  const getSelectedSubjects = classId => {
    const classSubjects = classesSubjects.find(cs => cs.classId === classId);

    return (classSubjects?.subjectIds || [])
      .map(subjectId => {
        const subjectItem = subjects.find(subject => subject.id === subjectId);
        return subjectItem ? { label: subjectItem.name, value: subjectItem.id } : null;
      })
      .filter(Boolean);
  };

  if (!classesSubjects || !classes || !subjects) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Subjects - Classes</h2>
      <div>
        <ol>
          {classes.map(cl => (
            <li key={cl.id} className={style.classItem}>
              <div>
                <span>
                  {cl.name}:
                  <span className={style.subjectsList}>
                    <SelectOptionsToText selectedOptions={getSelectedSubjects(cl.id)} />
                  </span>
                </span>
                <EditCloseSelectButton
                  isEditing={editingClassesId === cl.id}
                  onToggleEdit={() =>
                    setEditingClassesId(prevId => (prevId === cl.id ? null : cl.id))
                  }
                />
              </div>
              {editingClassesId === cl.id && (
                <MultiSelect
                  value={getSelectedSubjects(cl.id)}
                  onChange={selectedSubjects =>
                    handleSubjectSelectionChange(selectedSubjects, cl.id)
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
