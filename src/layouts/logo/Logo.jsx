import styles from './index.module.scss';
import sprite from '../../assets/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  const handleClick = () => {
    console.log('Logo clicked');
  };
  return (
    <Link
      to="/"
      className={styles.logo_container}
      onClick={handleClick}
      aria-label="Go to homepage"
    >
      <svg className={styles.logo_icon}>
        <use href={`${sprite}#logo_craftwork`}></use>
      </svg>
      <p>VocabBuilder</p>
    </Link>
  );
};

export default Logo;
