import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const UserNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dictionary"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Dictionary
      </NavLink>
      <NavLink
        to="/recommend"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Recommend
      </NavLink>
      <NavLink
        to="/training"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Training
      </NavLink>
    </nav>
  );
};

export default UserNav;
