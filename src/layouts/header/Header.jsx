import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Logo from '../logo/Logo.jsx';
import UserNav from '../userNav/UserNav';
import { useGetCurrentUserQuery } from '../../infrastructure/api/redux/apiSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user, isError, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      console.error('Failed to fetch user data', error.status, error.data);
    } else if (user) {
      console.log('Fetched user:', user);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.authenticated}>
        <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.nav_menu}>
            <UserNav toggleMenu={toggleMenu} />
          </div>
        </div>
        <div className={styles.desktopMenu}>
          <UserNav />
        </div>
        <button className={styles.burgerMenu} onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
