import { useState } from 'react';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from '../selects/MultiSelect';
import {
  addTeachersToSubject,
  removeTeacherFromSubject,
} from '../teacherSubject/redux/teacherSubjectSlice';
import { FaEdit, FaTimes, FaSave } from 'react-icons/fa';

export default function TeacherClassSubjectTable() {
  const dispatch = useDispatch();

  const [isSubjectsView, setIsSubjectsView] = useState(true);
  const [editingCell, setEditingCell] = useState(null);
  const [tempSelection, setTempSelection] = useState([]);

  const { teachers, classes, subjects, teachersClassesSubjects } = useSelector(
    state => state.teachersClassesSubjects
  );

  const getSubjectsForTeacherInClass = (teacherId, classId) => {
    const filtered = teachersClassesSubjects.filter(
      relation => relation.teacherId === teacherId && relation.classId === classId
    );

    return filtered
      .map(relation => {
        const subject = subjects.find(subject => subject.id === relation.subjectId);
        return subject ? { label: subject.name, value: subject.id } : null;
      })
      .filter(Boolean);
  };

  const handleEdit = (teacherId, classId) => {
    const currentSubjects = getSubjectsForTeacherInClass(teacherId, classId);
    setEditingCell({ teacherId, classId });
    setTempSelection(currentSubjects);
  };

  const handleSave = () => {
    if (!editingCell) return;

    const { teacherId, classId } = editingCell;
    const updatedSubjects = tempSelection.map(selected => selected.value);

    const existingRelations = teachersClassesSubjects.filter(
      relation => relation.teacherId === teacherId && relation.classId === classId
    );

    const subjectsToAdd = updatedSubjects.filter(
      subjectId => !existingRelations.some(rel => rel.subjectId === subjectId)
    );

    const subjectsToRemove = existingRelations
      .filter(rel => !updatedSubjects.includes(rel.subjectId))
      .map(rel => rel.subjectId);

    if (subjectsToAdd.length > 0) {
      dispatch(addTeachersToSubject({ teacherId, classId, subjectIds: subjectsToAdd }));
    }

    if (subjectsToRemove.length > 0) {
      dispatch(removeTeacherFromSubject({ teacherId, classId, subjectIds: subjectsToRemove }));
    }

    setEditingCell(null);
    setTempSelection([]);
  };

  const handleCancel = () => {
    setEditingCell(null);
    setTempSelection([]);
  };

  const toggleView = () => {
    setIsSubjectsView(prev => !prev);
  };

  return (
    <div className={style.tableContainer}>
      <button onClick={toggleView} className={style.toggleButton}>
        {isSubjectsView ? 'Classes' : 'Subjects'}
      </button>

      {isSubjectsView ? (
        <table>
          <thead>
            <tr>
              <th>Teacher</th>
              {classes.map(classItem => (
                <th key={classItem.id}>{classItem.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                {classes.map(classItem => {
                  const subjectsForTeacherInClass = getSubjectsForTeacherInClass(
                    teacher.id,
                    classItem.id
                  );
                  const isEditing =
                    editingCell &&
                    editingCell.teacherId === teacher.id &&
                    editingCell.classId === classItem.id;

                  return (
                    <td key={classItem.id}>
                      {isEditing ? (
                        <div className={style.editingContainer}>
                          <MultiSelect
                            isMulti
                            value={tempSelection}
                            onChange={setTempSelection}
                            options={subjects.map(subject => ({
                              label: subject.name,
                              value: subject.id,
                            }))}
                          />
                          <button onClick={handleSave} className={style.saveButton}>
                            <FaSave />
                          </button>
                          <button onClick={handleCancel} className={style.closeButton}>
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className={style.cellContent}>
                          {subjectsForTeacherInClass.length > 0
                            ? subjectsForTeacherInClass.map(s => s.label).join(', ')
                            : '-'}
                          <FaEdit
                            className={style.editIcon}
                            onClick={() => handleEdit(teacher.id, classItem.id)}
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Class</th>
              {teachers.map(teacher => (
                <th key={teacher.id}>{teacher.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => (
              <tr key={subject.id}>
                <td>{subject.name}</td>
                {teachers.map(teacher => (
                  <td key={teacher.id}>-</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
