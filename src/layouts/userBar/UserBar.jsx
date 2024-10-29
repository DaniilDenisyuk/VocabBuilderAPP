import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';
import styles from './index.module.scss';
import { useSignOutMutation } from '../../infrastructure/api/redux/apiSlice';

const UserBar = ({ user }) => {
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className={styles.user_bar}>
      <span>{user?.name}</span>
      <svg className={styles.avatar}>
        <use href={`${sprite}#icon-avatar`} />
      </svg>
      <button className={styles.btn_arrow} onClick={handleLogout}>
        Logout <MdArrowRightAlt />
      </button>
    </div>
  );
};

export default UserBar;
