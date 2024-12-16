import { FaEdit, FaTimes } from 'react-icons/fa';
import style from './index.module.scss';

export default function EditCloseSelectButton({ isEditing, onToggleEdit }) {
  return (
    <span onClick={onToggleEdit} className={style.editIcon}>
      {isEditing ? <FaTimes /> : <FaEdit />}
    </span>
  );
}
