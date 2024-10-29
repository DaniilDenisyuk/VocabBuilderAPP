import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../infrastructure/api/redux/apiSlice';
import styles from './index.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import authSchema from '../../../infrastructure/utils/authSchema';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(authSchema('login')) });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async data => {
    try {
      const response = await signIn(data).unwrap();
      if (!response.token) {
        throw new Error('No token received');
      }
      if (response.token) {
        dispatch(setToken(response.token));
        navigate('/dictionary');
        console.log('User login successfully:', response.token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className={styles.form_container}>
      <h2>Login</h2>
      <p className={styles.subtitle}>Welcome back! Please log in to your account.</p>
      {loginError && <p className={styles.error_message}>{loginError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <input type="text" id="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={styles.validation_error}>{errors.email.message}</p>}
        </label>
        <label className={styles.field}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            {...register('password')}
          />
          <FontAwesomeIcon
            className={styles.password_icon}
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          {errors.password && <p className={styles.validation_error}>{errors.password.message}</p>}
        </label>
        <button type="submit" className={styles.button}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {isError && (
          <p style={{ color: 'red' }}>Error: {error?.data?.message || 'Something went wrong'}</p>
        )}
      </form>
      <p className={styles.linkText}>
        <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default LoginForm;
