import Droppable from '../dnd/Droppable';
import Draggable from '../dnd/Draggable';
import style from './index.module.scss';

export default function ClassesPupils({ classes, pupils }) {
  return (
    <div className={style.container}>
      <h3>Classes & Pupils</h3>

      <ul className={style.list}>
        {classes.map(classItem => {
          const classPupils = pupils.filter(pupil => pupil.classId === classItem.id);

          return (
            <li key={classItem.id}>
              <Droppable id={`class-${classItem.id}`}>
                <h3>{classItem.name}</h3>
                <ol>
                  {classPupils.length === 0 ? (
                    <li>-</li>
                  ) : (
                    classPupils.map(pupil => (
                      <li key={pupil.id} className={style.item}>
                        <Draggable id={`pupil-${pupil.id}`}>{pupil.name}</Draggable>
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
