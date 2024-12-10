import Droppable from '../../utils/dnd/Droppable';
import Draggable from '../../utils/dnd/Draggable';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext } from '@dnd-kit/core';
import { transferPupil } from './redux/pupilsClassesSlice';
import { updPupilClass } from '../../components/pupilsList/redux/pupilsSlice';

export default function ClassesWithPupils() {
  const dispatch = useDispatch();
  const classes = useSelector(state => state.classes.classes);
  const pupils = useSelector(state => state.pupils.pupils);
  const pupilsClasses = useSelector(state => state.pupilsClasses.pupilsClasses);

  const handleDragEnd = event => {
    const { active, over } = event;

    if (!over || over.id === active.id) return;

    const pupilId = parseInt(active.id.split('-')[1], 10);
    const newClassId = parseInt(over.id.split('-')[1], 10);

    dispatch(updPupilClass({ id: pupilId, classId: newClassId }));
    dispatch(transferPupil({ pupilId, newClassId }));
  };

  return (
    <div className={style.container}>
      <h3>Classes & Pupils</h3>
      <DndContext onDragEnd={handleDragEnd}>
        <ul className={style.list}>
          {classes.map(classItem => {
            const classPupils = pupils.filter(pupil =>
              pupilsClasses.some(pc => pc.pupilId === pupil.id && pc.classId === classItem.id)
            );

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
      </DndContext>
    </div>
  );
}
