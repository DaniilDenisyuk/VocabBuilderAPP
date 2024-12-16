import style from './index.module.scss';
import { useState } from 'react';
import EditableTable from '../editableTable/EditableTable';

export default function RelationshipTable() {
  const [selectedTable, setSelectedTable] = useState('teacherSubject');

  const tableTabs = [
    { id: 'teachersSubjects', label: 'Teacher-Subject' },
    { id: 'teachersClasses', label: 'Teacher-Class' },
    { id: 'subjectsClasses', label: 'Subject-Class' },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.tabs}>
        {tableTabs.map(({ id, label }) => (
          <button
            key={id}
            className={selectedTable === id ? style.active : ''}
            onClick={() => setSelectedTable(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={style.table}>
        <EditableTable tableType={selectedTable} />
      </div>
    </div>
  );
}
