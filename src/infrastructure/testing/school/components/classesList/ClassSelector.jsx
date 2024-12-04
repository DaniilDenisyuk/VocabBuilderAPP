import style from './index.module.scss';

export default function ClassSelector({ classes, currentClassId, onChange }) {
  // console.log('Classes:', classes);
  // console.log('Current class ID:', currentClassId || '');
  if (!classes || classes.length === 0) {
    return <p>No classes available</p>;
  }
  return (
    <select
      className={style.select}
      value={currentClassId || ''}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value="" disabled>
        Сhoose a class
      </option>
      {classes.map(classItem => (
        <option key={classItem.id} value={classItem.id}>
          {classItem.name}
        </option>
      ))}
    </select>
  );
}
