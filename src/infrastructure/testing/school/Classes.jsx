// 1. Зробити компонент, який буде відображати учнів в кожному класі.
// 2. Додати можливість створювати нові класи, поки без учнів.
// 3. Додати можливість створювати нових учнів у класі.
// 4. Додати можливість видаляти класи та учнів.
// 5. Додати можливість переносити учнів між класами
// 6. Додати можливість додавати та видаляти вчителів в клас
import style from './index.module.scss';
import { useState } from 'react';
let idClass = 0;
let idPupil = 0;
let idTeach = 0;

export default function Classes() {
  const [className, setClassName] = useState('');
  const [classNetwork, setClassNetwork] = useState([]);

  const handleMovePupil = () => {};

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
        <button
          onClick={() => {
            setClassNetwork([
              ...classNetwork,
              { id: idClass++, className: className, teachers: [], pupils: [] },
            ]);
            setClassName('');
          }}
        >
          Add class
        </button>
        <ol className={style.listClasses}>
          {classNetwork.map(cl => (
            <li key={cl.id} className={style.li}>
              {cl.className}
              <button
                onClick={() => {
                  setClassNetwork(classNetwork.filter(a => a.id !== cl.id));
                }}
              >
                Delete class
              </button>

              <div className={style.inputContainer}>
                {/* //=============add teach================== */}
                <div className={style.inputContainerTeach}>
                  <input
                    placeholder="add teach"
                    value={cl.newTeach || ''}
                    onChange={e =>
                      setClassNetwork(
                        classNetwork.map(item =>
                          item.id === cl.id ? { ...item, newTeach: e.target.value } : item
                        )
                      )
                    }
                  />
                  <button
                    onClick={() => {
                      setClassNetwork(
                        classNetwork.map(item =>
                          item.id === cl.id
                            ? {
                                ...item,
                                teachers: [
                                  ...item.teachers,
                                  { id: idTeach++, name: item.newTeach },
                                ],
                                newTeach: '',
                              }
                            : item
                        )
                      );
                    }}
                  >
                    Add a teach to a class
                  </button>
                  <ol className={style.listTeach}>
                    {cl.teachers.map(teach => (
                      <li key={teach.id}>
                        {teach.name}
                        <button
                          onClick={() =>
                            setClassNetwork(
                              classNetwork.map(item =>
                                item.id === cl.id
                                  ? {
                                      ...item,
                                      teachers: item.teachers.filter(a => a.id !== teach.id),
                                    }
                                  : item
                              )
                            )
                          }
                        >
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
                      setClassNetwork(
                        classNetwork.map(item =>
                          item.id === cl.id ? { ...item, newPupilName: e.target.value } : item
                        )
                      )
                    }
                  />
                  <button
                    onClick={() => {
                      setClassNetwork(
                        classNetwork.map(item =>
                          item.id === cl.id
                            ? {
                                ...item,
                                pupils: [
                                  ...item.pupils,
                                  { id: idPupil++, name: item.newPupilName },
                                ],
                                newPupilName: '',
                              }
                            : item
                        )
                      );
                    }}
                  >
                    Add a pupil to a class
                  </button>
                  <ol className={style.listPupil}>
                    {cl.pupils.map(pupil => (
                      <li key={pupil.id}>
                        {pupil.name}
                        <button
                          onClick={() =>
                            setClassNetwork(
                              classNetwork.map(item =>
                                item.id === cl.id
                                  ? {
                                      ...item,
                                      pupils: item.pupils.filter(a => a.id !== pupil.id),
                                    }
                                  : item
                              )
                            )
                          }
                        >
                          Delete pupil
                        </button>
                        <select value={className} onChange={e => setClassName(e.target.value)}>
                          {classNetwork.map((el, key) => (
                            <option key={key} value={el}>
                              {el.className}
                            </option>
                          ))}
                        </select>
                        <button onClick={handleMovePupil}>Move</button>
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
