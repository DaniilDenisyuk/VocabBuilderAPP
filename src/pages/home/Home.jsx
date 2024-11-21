// Home.jsx
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import imgTitleRegisterWebP from '../../assets/img/illustration1x.webp';
import imgTitleRegister2xWebP from '../../assets/img/illustration2x.webp';
import imgTitleRegister from '../../assets/img/illustration2x.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation, useSignUpMutation } from '../../infrastructure/api/redux/apiSlice';
import RegisterForm from '../../features/auth/components/RegisterForm';
import LoginForm from '../../features/auth/components/LoginForm';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [activeForm, setActiveForm] = useState('register');
  const [signUp, { isLoading: isSignUp, error: signUpError }] = useSignUpMutation();
  const [signIn, { isLoading: isSignIn, error: signInError }] = useSignInMutation();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setActiveForm('login');
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dictionary');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = async data => {
    try {
      if (activeForm === 'register') {
        await signUp(data).unwrap();
        setActiveForm('login');
      } else {
        await signIn(data).unwrap();
        navigate('/dictionary');
      }
    } catch (error) {
      console.error(`${activeForm === 'register' ? 'Registration' : 'Login'} error:`, error);
    }
  };

  return (
    <>
      <div className={styles.gradientBackground}></div>
      <div className={styles.homeContainer}>
        <div className={styles.homeContainerForm}>
          {activeForm === 'register' ? (
            <RegisterForm
              onSubmit={data => handleAuth(data, true)}
              error={signUpError}
              isLoading={isSignUp}
            />
          ) : (
            <LoginForm
              onSubmit={data => handleAuth(data, false)}
              error={signInError}
              isLoading={isSignIn}
            />
          )}
        </div>
        <div className={styles.homeContainerImg}>
          <picture>
            <source
              srcSet={`${imgTitleRegisterWebP} 1x, ${imgTitleRegister2xWebP} 2x`}
              type="image/webp"
            />
            <source srcSet={`${imgTitleRegister} 1x`} type="image/png" />
            <img src={imgTitleRegister} alt="user register" className={styles.responsiveImage} />
          </picture>
          <div>
            <p>Word · Translation · Grammar · Progress</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
