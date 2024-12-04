import { useSelector } from 'react-redux';
import style from './index.module.scss';

export default function TeachersWithClasses() {
  const classes = useSelector(state => state.school.classes);
  const teachers = useSelector(state => state.school.teachers);

  return (
    <>
      <h2>Teachers with their classes</h2>
      <div>
        <ol>
          {teachers.map(teacher => (
            <li key={teacher.id} className={style.teacherItem}>
              {teacher.name}

              <ul className={style.classList}>
                {teacher && teacher.classIds.length > 0 ? (
                  teacher.classIds.map(classId => {
                    const teachClass = classes.find(cl => cl.id === classId);
                    return teachClass ? (
                      <li key={classId} className={style.classItem}>
                        {teachClass.name}
                      </li>
                    ) : null;
                  })
                ) : (
                  <p>-</p>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
