//ClassesTeachers.jsx
import Droppable from '../dnd/Droppable';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';

export default function ClassesTeachers({ classes, teachers }) {
  return (
    <div className={style.container}>
      <h3>Classes & Teachers</h3>

      <ul className={style.list}>
        {classes.map(classItem => {
          const classTeachers = teachers.filter(teacher => teacher.classIds.includes(classItem.id));

          return (
            <li key={classItem.id}>
              <Droppable id={`class-${classItem.id}`}>
                <h3>{classItem.name}</h3>
                <ol>
                  {classTeachers.length === 0 ? (
                    <li>-</li>
                  ) : (
                    classTeachers.map(teacher => (
                      <li key={teacher.id}>
                        <Draggable id={`teacher-${teacher.id}`}>{teacher.name}</Draggable>
                      </li>
                    ))
                  )}
                </ol>
              </Droppable>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
