import Draggable from '../dnd/Draggable';
import style from './index.module.scss';
import { useSelector } from 'react-redux';

export default function TeachersWithSubjects() {
  const school = useSelector(state => state.school);
  const { teachers, subjects } = school;

  return (
    <div className={style.container}>
      <h3>Teachers & Subjects </h3>
      <ol>
        {teachers.map(teacher => {
          return (
            <li key={teacher.id} className={style.item}>
              <Draggable id={`teacher-${teacher.id}`}>
                <span>{teacher.name}</span>
              </Draggable>

              <ul className={style.classList}>
                {Array.isArray(teacher.subjectIds) && teacher.subjectIds.length > 0 ? (
                  teacher.subjectIds.map(subjectId => {
                    const teacherSubject = subjects.find(s => s.id === subjectId.id);

                    return teacherSubject ? (
                      <li key={subjectId} className={style.itemIdtem}>
                        <Draggable id={`subject-${subjectId}`}>
                          <span>{teacherSubject.name}</span>
                        </Draggable>
                      </li>
                    ) : null;
                  })
                ) : (
                  <p>-</p>
                )}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
