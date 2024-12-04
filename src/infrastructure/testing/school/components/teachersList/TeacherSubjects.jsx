import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from '../dnd/Draggable';
import SubjectsMultiSelector from '../subjectsList/SubjectsMultiSelector';
import { addItem, deleteItem, updTeachers } from '../../redux/schoolSlice';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import style from './index.module.scss';

export default function TeacherSubjects() {
  const dispatch = useDispatch();
  const { teachers, subjects } = useSelector(state => state.school);

  const [teacherName, setTeacherName] = useState('');
  const [error, setError] = useState('');

  const handleAddTeacher = useCallback(() => {
    if (!teacherName.trim()) {
      setError('Teacher name cannot be empty');
      return;
    }
    if (teachers.some(teacher => teacher.name === teacherName)) {
      setError('Teacher name must be unique');
      return;
    }

    setError('');
    const newId = teachers.length > 0 ? teachers[teachers.length - 1].id + 1 : 1;

    dispatch(
      addItem({
        field: 'teachers',
        item: { id: newId, name: teacherName, classIds: [], subjectIds: [] },
      })
    );
    setTeacherName('');
  }, [dispatch, teacherName, teachers]);

  const handleDelTeacher = useCallback(
    id => {
      const teacherToDelete = teachers.find(teacher => teacher.id === id);
      if (teacherToDelete) {
        dispatch(deleteItem({ field: 'teachers', itemId: id }));
      }
    },
    [dispatch, teachers]
  );

  const handleSubjectChange = useCallback(
    (teacherId, updatedSubjectIds) => {
      dispatch(updTeachers({ teacherId, subjectIds: updatedSubjectIds }));
    },
    [dispatch]
  );

  const handleKeyDown = useEnterKeyHandler(handleAddTeacher);

  return (
    <div className={style.teachersContainer}>
      <h2>Teachers</h2>
      <div className={style.inputContainer}>
        <input
          placeholder="Add teacher"
          value={teacherName}
          onChange={e => setTeacherName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTeacher} className={style.addButton}>
          Add Teacher
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subjects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher.id} className={style.row}>
              <td>{index + 1}</td>
              <td>
                <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
              </td>
              <td>
                <SubjectsMultiSelector
                  subjects={subjects}
                  selectedSubjects={teacher.subjectIds || []}
                  onSubjectsChange={updatedSubjectIds =>
                    handleSubjectChange(teacher.id, updatedSubjectIds)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelTeacher(teacher.id)} className={style.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
