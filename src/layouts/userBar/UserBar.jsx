import { MdArrowRightAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';
import styles from './index.module.scss';
import { logout } from '../../features/auth/redux/authOperations';

const UserBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
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
