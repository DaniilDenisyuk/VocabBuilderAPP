// Home.jsx
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import imgTitleRegisterWebP from '../../assets/img/illustration1x.webp';
import imgTitleRegister2xWebP from '../../assets/img/illustration2x.webp';
import imgTitleRegister from '../../assets/img/illustration2x.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../features/auth/components/AuthForm';
import { login, register } from '../../features/auth/redux/authOperations';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('register');
  const [hasVisited, setHasVisited] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setActiveForm('login');
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
    setHasVisited(true);
  }, []);

  useEffect(() => {
    if (hasVisited && isAuthenticated) {
      navigate('/dictionary');
    }
  }, [isAuthenticated, hasVisited, navigate]);

  const handleRegister = data => {
    dispatch(register(data))
      .then(() => {
        setActiveForm('login');
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  const handleLogin = data => {
    dispatch(login(data))
      .then(() => {
        navigate('/dictionary');
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };
  return (
    <div className={styles.home_container}>
      <div className={styles.gradient_background}></div>
      <div className={styles.home_container_form}>
        <AuthForm
          title={activeForm === 'register' ? 'Register' : 'Login'}
          supportingText={
            activeForm === 'register'
              ? 'To start using our services, please fill out the registration form below. All fields are mandatory:'
              : 'Please enter your login details to continue using our service:'
          }
          fields={activeForm === 'register' ? ['name', 'email', 'password'] : ['email', 'password']}
          onSubmit={activeForm === 'register' ? handleRegister : handleLogin}
          linkPath={activeForm === 'register' ? '/login' : '/register'}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
      </div>

      <div className={styles.home_container_img}>
        <picture>
          <source
            srcSet={`${imgTitleRegisterWebP} 1x, ${imgTitleRegister2xWebP} 2x`}
            type="image/webp"
          />
          <source srcSet={`${imgTitleRegister} 1x`} type="image/png" />
          <img src={imgTitleRegister} alt="user register" className={styles.responsive_image} />
        </picture>
        <div>
          <p>Word · Translation · Grammar · Progress</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
