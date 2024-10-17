import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import authSchema from '../../../infrastructure/utils/authSchema';

const AuthForm = ({
  title,
  supportingText,
  fields,
  onSubmit,
  activeForm,
  setActiveForm,
  linkText,
  linkPath,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ resolver: joiResolver(authSchema(activeForm)) });

  const [showPassword, setShowPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleFormSubmit = async data => {
    try {
      const response = await onSubmit({ ...data, formType: activeForm });
      if (response) {
        reset();
        if (activeForm === 'register') {
          setActiveForm('login');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleButtonClick = formType => {
    setActiveForm(formType);
  };

  useEffect(() => {
    const isFilled = Object.values(errors).some(field => field);
    setIsFormFilled(isDirty || isFilled);
  }, [errors, isDirty]);

  return (
    <div className={styles.form_container}>
      <h2>{title}</h2>
      <p className={styles.subtitle}>{supportingText}</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {fields.includes('name') && (
          <label className={styles.field}>
            <input type="text" id="name" placeholder="Name" {...register('name')} />
            {errors.name && <p className={styles.validation_error}>{errors.name.message}</p>}
          </label>
        )}
        <label className={styles.field}>
          <input type="email" id="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={styles.validation_error}>{errors.email.message}</p>}
        </label>
        <label className={styles.field} style={{ position: 'relative' }}>
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

        {isFormFilled ? (
          <button
            type="submit"
            className={`${styles.button} ${
              activeForm === 'register' ? styles.active_button : styles.inactive_button
            }`}
          ></button>
        ) : (
          <button
            type="button"
            className={`${styles.button} ${
              activeForm === 'register' ? styles.active_button : styles.inactive_button
            }`}
            onClick={() => handleButtonClick(activeForm === 'register' ? 'login' : 'register')}
          >
            {activeForm === 'register' ? 'Register1' : 'Login1'}
          </button>
        )}
      </form>

      <div className={styles.form_toggle}>
        <button
          className={`${styles.button} ${
            activeForm === 'register' ? styles.active_button : styles.inactive_button
          }`}
          onClick={() => handleButtonClick('register')}
        >
          Register1
        </button>
        <button
          className={`${styles.button} ${
            activeForm === 'login' ? styles.active_button : styles.inactive_button
          }`}
          onClick={() => handleButtonClick('login')}
        >
          Login1
        </button>
      </div>
      <p className={styles.link_text}>
        <a href={linkPath}>{linkText}</a>
      </p>
    </div>
  );
};

export default AuthForm;
