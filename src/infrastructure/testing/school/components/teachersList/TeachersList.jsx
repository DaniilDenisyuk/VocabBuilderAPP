import { useCallback, useState } from 'react';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import useEnterKeyHandler from '../../hooks/useEnterKeyHandler';
import MultiClassSelector from '../classesList/MultiClassSelector';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, updTeachers } from '../../redux/schoolSlice';

export default function TeachersList() {
  const dispatch = useDispatch();
  const school = useSelector(state => state.school);
  const { teachers, classes } = school;

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
        item: { id: newId, name: teacherName, classIds: [], subjectsIds: [] },
      })
    );
    setTeacherName('');
  }, [dispatch, teacherName, teachers]);

  const handleDelTeacher = useCallback(
    id => {
      if (!id) {
        console.error('Invalid teacher id:', id);
        return;
      }

      const teacherToDelete = teachers.find(cl => cl.id === id);
      if (teacherToDelete) {
        dispatch(deleteItem({ field: 'teachers', itemId: id }));
      } else {
        console.error('Teacher not found:', id);
      }
    },
    [dispatch, teachers]
  );

  const handleClassChange = useCallback(
    (teacherId, updatedClassIds) => {
      dispatch(updTeachers({ teacherId, classIds: updatedClassIds }));
    },
    [dispatch]
  );

  const handleKeyDown = useEnterKeyHandler(handleAddTeacher);

  return (
    <>
      <div className={style.switchContainer}></div>
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
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teachers) &&
              teachers.map((teacher, index) => (
                <tr key={teacher.id} className={style.row}>
                  <td>
                    <span className={style.itemNumber}>{index + 1}</span>
                  </td>
                  <td>
                    <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
                  </td>
                  <td>
                    <MultiClassSelector
                      classes={classes}
                      selectedClassIds={teacher.classIds}
                      onChange={updClassIds => {
                        handleClassChange(teacher.id, updClassIds);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelTeacher(teacher.id)}
                      className={style.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
