import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../../infrastructure/api/redux/apiSlice';
import styles from './index.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import authSchema from '../../../infrastructure/utils/authSchema';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading, isError, error }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(authSchema('register')) });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async data => {
    try {
      const response = await signup(data).unwrap();
      if (response.token) {
        dispatch(setToken(response.token));
        navigate('/login');
        console.log('User registered successfully:', response.token);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={styles.form_container}>
      <h2>Register</h2>
      <p className={styles.subtitle}>
        To start using our services, please fill out the registration form below. All fields are
        mandatory:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <input type="text" id="name" placeholder="Name" {...register('name')} />
          {errors.name && <p className={styles.validation_error}>{errors.name.message}</p>}
        </label>
        <label className={styles.field}>
          <input type="text" id="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={styles.validation_error}>{errors.email.message}</p>}
        </label>
        <label className={styles.field}>
          <input
            className={styles.fieldPassword}
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            {...register('password')}
          />
          <FontAwesomeIcon
            className={styles.passwordIcon}
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
        {/* <button type="submit" className={`${styles.button} ${styles.active_button}`}>
          Register
        </button> */}
        <button
          type="submit"
          disabled={isLoading}
          className={`${styles.button} ${styles.active_button}`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {isError && (
          <p style={{ color: 'red' }}>Error: {error?.data?.message || 'Something went wrong'}</p>
        )}
      </form>
      <p className={styles.linkText}>
        <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default RegisterForm;
