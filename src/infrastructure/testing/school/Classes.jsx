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
let idTeach = 0;
const initialState = {
  classes: [
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
  ],
  className: '',
};

export default function Classes() {
  const [className, setClassName] = useState('');
  const [classNetwork, setClassNetwork] = useImmer(initialState.classes);

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

  function handleAddTeach(classId, teachName) {
    if (!teachName) return;
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      if (currClass)
        currClass.teachers.push({
          id: idTeach++,
          name: teachName,
        });
      currClass.draft.teachName = '';
    });
  }
  function handleDelTeach(classId, teachId) {
    setClassNetwork(draft => {
      const currClass = draft.find(cl => cl.id === classId);
      if (currClass) {
        currClass.teachers = currClass.teachers.filter(teach => teach.id !== teachId);
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
      console.log('fromClass=', fromClass);
      //клас в який перенос
      const toClass = draft.find(cl => cl.id === toClassId);
      if (!toClass) return;
      console.log('toClass=', toClass.className);
      //ящо обидва класи є, то
      if (fromClass && toClass) {
        //шукаю учня за його id (pupilId)
        const pupil = fromClass.pupils.find(p => p.id === pupilId);
        console.log('знайдений учень:', pupil.name);
        if (pupil) {
          //з цього видаляю
          fromClass.pupils = fromClass.pupils.filter(p => p.id !== pupilId);
          //в цей вставляю
          toClass.pupils.push(pupil);
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
                    placeholder="add teach"
                    value={cl.newTeach || ''}
                    onChange={e =>
                      setClassNetwork(draft => {
                        const currClass = draft.find(item => item.id === cl.id);
                        if (currClass) {
                          currClass.newTeach = e.target.value;
                        }
                      })
                    }
                  />
                  <button onClick={() => handleAddTeach(cl.id, cl.newTeach)}>
                    Add a teach to a class
                  </button>
                  <ol className={style.listTeach}>
                    {cl.teachers.map(teach => (
                      <li key={`teach-${teach.id}`}>
                        {teach.name}
                        <button onClick={() => handleDelTeach(cl.id, teach.id)}>
                          Delete teach
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
                          value={cl.newPupilToClassId}
                          onChange={e =>
                            setClassNetwork(draft => {
                              const currClass = draft.find(item => item.id === cl.id);
                              if (currClass) {
                                const pupilToMove = currClass.pupils.find(p => p.id === pupil.id);
                                if (pupilToMove) {
                                  pupil.newPupilToClassId = e.target.value;
                                }
                              }
                            })
                          }
                        >
                          <option>Move to...</option>
                          {classNetwork.map((el, key) => (
                            <option key={`option-${key}`} value={el.id}>
                              {el.className}
                            </option>
                          ))}
                        </select>

                        <button onClick={() => handleMovePupil(cl.id, pupil.id, pupil.toClassId)}>
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
