import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const UserNav = () => {
  return (
    <nav className={styles.nav}>
      {['/dictionary', '/recommend', '/training'].map(path => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
        </NavLink>
      ))}
    </nav>
  );
};

export default UserNav;
