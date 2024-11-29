// 1. Зробити компонент, який буде відображати учнів в кожному класі.
// 2. Додати можливість створювати нові класи, поки без учнів.
// 3. Додати можливість створювати нових учнів у класі.
// 4. Додати можливість видаляти класи та учнів.
// 5. Додати можливість переносити учнів між класами
// 6. Додати можливість додавати та видаляти вчителів в клас
import { useImmer } from 'use-immer';
import style from './index.module.scss';
import { useState } from 'react';
let idClass = 0;
let idPupil = 0;
let idTeacher = 0;
const initialState = [
  {
    id: 0,
    className: '1-A',
    teachers: [
      { id: 0, name: 'Teacher 1' },
      { id: 1, name: 'Teacher 2' },
      { id: 2, name: 'Teacher 3' },
    ],
    pupils: [
      { id: 0, name: '1 Pupil 1-A' },
      { id: 1, name: '2 Pupil 1-A' },
      { id: 2, name: '3 Pupil 1-A' },
    ],
  },
  {
    id: 1,
    className: '2-A',
    teachers: [
      { id: 0, name: 'Teacher 1' },
      { id: 1, name: 'Teacher 2' },
      { id: 2, name: 'Teacher 3' },
    ],
    pupils: [
      { id: 0, name: '1 Pupil 2-A' },
      { id: 1, name: '2 Pupil 2-A' },
      { id: 2, name: '3 Pupil 2-A' },
    ],
  },
  {
    id: 2,
    className: '3-A',
    teachers: [
      { id: 0, name: 'Teacher 1' },
      { id: 1, name: 'Teacher 2' },
      { id: 2, name: 'Teacher 3' },
    ],
    pupils: [
      { id: 0, name: '1 Pupil 3-A' },
      { id: 1, name: '2 Pupil 3-A' },
      { id: 2, name: '3 Pupil 3-A' },
    ],
  },
];

export default function Classes() {
  const [className, setClassName] = useState('');
  const [classNetwork, setClassNetwork] = useImmer(initialState);

  function handleAddClass() {
    setClassNetwork(draft => {
      draft.push({
        id: idClass++,
        className: className.trim(),
        teachers: [],
        pupils: [],
      });
    });
    setClassName('');
  }
  function handleDelClass(classId) {
    setClassNetwork(draft => {
      return draft.filter(cl => cl.id !== classId);
    });
  }

  function handleAddTeach(classId, teacherName) {
    if (!teacherName) return;
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      if (currClass)
        currClass.teachers.push({
          id: idTeacher++,
          name: teacherName,
        });
      currClass.teacherName = '';
    });
  }
  function handleDelTeach(classId, teacherId) {
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      if (currClass) {
        currClass.teachers = currClass.teachers.filter(teach => teach.id !== teacherId);
      }
    });
  }

  function handleAddPupil(classId, pupilName) {
    if (!pupilName) return;
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      if (currClass) {
        currClass.pupils.push({
          id: idPupil++,
          name: pupilName,
        });
      }
    });
  }
  function handleDelPupil(classId, pupilId) {
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      currClass.pupils = currClass.pupils.filter(pupil => pupil.id !== pupilId);
    });
  }

  function handleMovePupil(classId, pupilId, toClassId) {
    console.log(`перенести учня з ID: ${pupilId} з класу ${classId} до класу ${toClassId}`);

    setClassNetwork(draft => {
      //клас з якого перенос
      const fromClass = draft.find(cl => cl.id === classId);
      if (!fromClass) return;
      //клас в який перенос
      const toClass = draft.find(cl => cl.id === toClassId);
      if (!toClass) return;
      //ящо обидва класи є, то
      if (fromClass && toClass) {
        //шукаю учня за його id (pupilId)
        const pupil = fromClass.pupils.find(p => p.id === pupilId);
        console.log('знайдений учень:', pupil.name);
        if (pupil) {
          //з цього видаляю
          fromClass.pupils = fromClass.pupils.filter(p => p.id !== pupilId);
          //в цей вставляю
          toClass.pupils.push({ ...pupil, newPupilToClassId: toClassId });
        }
      }
    });
  }

  return (
    <div className={style.listContainer}>
      <h2>Classes</h2>

      {/* //=============add class================== */}
      <div className={style.inputContainer}>
        <input
          placeholder="add class"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />
        <button onClick={() => handleAddClass()}>Add class</button>
        <ol className={style.listClasses}>
          {classNetwork.map(cl => (
            <li key={`class-${cl.id}`} className={style.li}>
              {cl.className}
              <button onClick={() => handleDelClass(cl.id)}>Delete class</button>

              <div className={style.inputContainer}>
                {/* //=============add teach================== */}
                <div className={style.inputContainerTeach}>
                  <input
                    placeholder="add teacher"
                    value={cl.newTeacher || ''}
                    onChange={e =>
                      setClassNetwork(draft => {
                        const currClass = draft.find(item => item.id === cl.id);
                        if (currClass) {
                          currClass.newTeacher = e.target.value;
                        }
                      })
                    }
                  />
                  <button onClick={() => handleAddTeach(cl.id, cl.newTeacher)}>
                    Add a teach to a class
                  </button>
                  <ol className={style.listTeacher}>
                    {cl.teachers.map(teacher => (
                      <li key={`teacher-${teacher.id}`}>
                        {teacher.name}
                        <button onClick={() => handleDelTeach(cl.id, teacher.id)}>
                          Delete teacher
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* //================add pupil=============== */}
                <div className={style.inputContainerPupil}>
                  <input
                    placeholder="add pupil"
                    value={cl.newPupilName || ''}
                    onChange={e =>
                      setClassNetwork(draft => {
                        const currClass = draft.find(pupil => pupil.id === cl.id);
                        if (currClass) {
                          currClass.newPupilName = e.target.value;
                        }
                      })
                    }
                  />
                  <button onClick={() => handleAddPupil(cl.id, cl.newPupilName)}>
                    Add a pupil to a class
                  </button>
                  <ol className={style.listPupil}>
                    {cl.pupils.map(pupil => (
                      <li key={`pupil-${pupil.id}`}>
                        {pupil.name}
                        <button onClick={() => handleDelPupil(cl.id, pupil.id)}>
                          Delete pupil
                        </button>

                        <select
                          value={pupil.newPupilToClassId || ''}
                          onChange={e =>
                            setClassNetwork(draft => {
                              const currClass = draft.find(item => item.id === cl.id);
                              if (currClass) {
                                const currPupil = currClass.pupils.find(p => p.id === pupil.id);
                                if (currPupil) {
                                  currPupil.newPupilToClassId = Number(e.target.value);
                                }
                              }
                            })
                          }
                        >
                          <option>Move to...</option>
                          {classNetwork.map(el => (
                            <option key={el.id} value={el.id}>
                              {el.className}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => {
                            const currClass = classNetwork.find(item => item.id === cl.id);
                            if (currClass) {
                              const currPupil = currClass.pupils.find(p => p.id === pupil.id);
                              if (currPupil && currPupil.newPupilToClassId) {
                                handleMovePupil(cl.id, pupil.id, currPupil.newPupilToClassId);
                                currPupil.newPupilToClassId = '';
                              }
                            }
                          }}
                        >
                          Move
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// import { DndContext } from '@dnd-kit/core';
// import Droppable from '../dnd/Droppable';
// import style from './index.module.scss';
// import Draggable from '../dnd/Draggable';
// import { useEffect, useState } from 'react';

// export default function ClassesList({ classes, pupils, teachers, onTransfer }) {
//   const [availableTeachers, setAvailableTeachers] = useState(teachers || []);

//   const [classTeachers, setClassTeachers] = useState(
//     (classes || []).map(classItem => ({
//       id: classItem.id,
//       className: classItem.className,
//       pupils: pupils.filter(pupil => pupil.classId === classItem.id),
//       teachers: [],
//     }))
//   );

//   console.log('Initial classTeachers:', classTeachers);
//   console.log('Initial availableTeachers:', availableTeachers);
//   useEffect(() => {
//     setAvailableTeachers(teachers || []);
//     console.log('Teachers updated:', teachers);
//   }, [teachers]);

//   function handleDragEnd(event) {
//     const { active, over } = event;

//     console.log('Drag End:', { active, over });

//     if (!active || !over) {
//       console.log('Pupil was not dropped on a valid class.');
//       return;
//     }

//     if (active.id.startsWith('pupil-') && over.id.startsWith('class-')) {
//       const pupilId = parseInt(active.id.replace('pupil-', ''), 10);
//       const newClassId = parseInt(over.id.replace('class-', ''), 10);
//       console.log('Pupil ID:', pupilId, 'New Class ID:', newClassId);
//       onTransfer(pupilId, newClassId);
//     }

//     if (active.id.startsWith('teacher-') && over.id.startsWith('class-')) {
//       const teacherId = parseInt(active.id.replace('teacher-', ''), 10);
//       const classId = parseInt(over.id.replace('class-', ''), 10);
//       console.log('Teacher ID:', teacherId, 'Class ID:', classId);
//       onTeacherCopy(teacherId, classId);
//     }
//   }

//   function onTeacherCopy(teacherId, classId) {
//     console.log('Teacher Copy:', { teacherId, classId });
//     const teacher = availableTeachers.find(t => t.id === teacherId);
//     if (!teacher) {
//       console.log('Teacher not found:', teacherId);
//       return;
//     }

//     setAvailableTeachers(prevTeachers => prevTeachers.filter(t => t.id !== teacherId));

//     setClassTeachers(prev =>
//       prev.map(classItem => {
//         if (classItem.id === classId) {
//           console.log('Updating class:', classItem.className);
//           if (!classItem.teachers.find(teacher => teacher.id === teacherId)) {
//             const teacher = teachers.find(t => t.id === teacherId);
//             return {
//               ...classItem,
//               teachers: [...classItem.teachers, teacher],
//             };
//           }
//         }
//         return classItem;
//       })
//     );
//   }

//   return (
//     <div>
//       <h1>Classes</h1>
//       <DndContext onDragEnd={handleDragEnd}>
//         {/* Список доступних вчителів */}
//         <h4>Available Teachers:</h4>
//         <Droppable id="available-teachers">
//           <ul className={style.teachersList}>
//             {availableTeachers.map(teacher => (
//               <li key={teacher.id}>
//                 <Draggable id={`teacher-${teacher.id}`}>{teacher.teacherName}</Draggable>
//               </li>
//             ))}
//           </ul>
//         </Droppable>

//         {/* Список класів */}
//         <ul className={style.classesList}>
//           {classTeachers.map(classItem => (
//             <li key={classItem.id}>
//               {/* Клас */}
//               <Droppable id={`class-${classItem.id}`}>
//                 <h3>{classItem.className}</h3>

//                 {/* Список вчителів */}
//                 <h4>Teachers:</h4>
//                 <Droppable id={`class-${classItem.id}-teachers`} isTeachers>
//                   <ul>
//                     {classItem.teachers.map(teacher => (
//                       <li key={teacher.id}>
//                         <Draggable id={`teacher-${teacher.id}`}>{teacher.teacherName}</Draggable>
//                       </li>
//                     ))}
//                   </ul>
//                 </Droppable>
//                 {/* Список учнів */}
//                 <h4>Pupils:</h4>
//                 <Droppable id={`class-${classItem.id}-pupils`} isPupils>
//                   <ul>
//                     {classItem.pupils.map(pupil => (
//                       <li key={pupil.id}>
//                         <Draggable id={`pupil-${pupil.id}`}>{pupil.pupilName}</Draggable>
//                       </li>
//                     ))}
//                   </ul>
//                 </Droppable>
//               </Droppable>
//             </li>
//           ))}
//         </ul>
//       </DndContext>
//     </div>
//   );
// }
