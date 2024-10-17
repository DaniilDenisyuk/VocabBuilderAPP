import styles from './index.module.scss';
import sprite from '../../assets/icons/sprite.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo_container}>
      <svg className={styles.logo_icon}>
        <use href={`${sprite}#logo_craftwork`}></use>
      </svg>
      <p>VocabBuilder</p>
    </Link>
  );
};

export default Logo;
