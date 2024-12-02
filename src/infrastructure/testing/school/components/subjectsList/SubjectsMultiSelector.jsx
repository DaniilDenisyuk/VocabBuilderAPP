import { useState } from 'react';
import style from './index.module.scss';

export default function SubjectsMultiSelector({ subjects = [] }) {
  const initialSubjects = subjects;
  //стан вибраних і доступних предметів
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [avaibleSubjects, setAvaibleSubjects] = useState(initialSubjects);

  //додати предмет
  const handleAddSubject = subject => {
    setSelectedSubjects([...selectedSubjects, subject]);
    setAvaibleSubjects(avaibleSubjects.filter(item => item !== subject));
  };
  //видалити предмет
  const handleRemoveSubject = subject => {
    setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    setAvaibleSubjects([...avaibleSubjects, subject]);
  };

  return (
    <>
      <div className={style.multiClassSelector}>
        {/* селектор предметів */}

        <select
          onChange={e => handleAddSubject(e.target.value)}
          value="" // очистити значення після вибору
          style={{ marginBottom: '10px', padding: '5px' }}
        >
          <option value="" disabled>
            Оберіть предмет
          </option>
          {avaibleSubjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {/* вибрані предмети */}
        <div>
          {selectedSubjects.map((subject, index) => (
            <div key={index}>
              <span>{subject}</span>
              <button onClick={() => handleRemoveSubject(subject)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
