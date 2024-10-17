import classNames from 'classnames';
import styles from './index.module.scss';

const VerbTypeSwitch = ({ selectedVerbType, onChange, className, selectStyleName = 'modal' }) => {
  const RadioButton = ({ id, value, checked, label }) => (
    <div
      className={classNames(
        styles.radioBtnContainer,
        styles[`radioBtnContainer--${selectStyleName}`]
      )}
    >
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioBtnInput}
      />
      <label
        htmlFor={id}
        className={classNames(styles.radioBtnLabel, { [styles.checked]: checked })}
      >
        <span
          className={classNames(styles.radioBtnText, styles[`radioBtnText--${selectStyleName}`])}
        >
          {label}
        </span>
      </label>
    </div>
  );

  return (
    <div className={classNames(styles.radioBtnGroup, className)}>
      <RadioButton
        id="regular"
        value="Regular"
        checked={selectedVerbType === 'Regular'}
        onChange={onChange}
        label="Regular"
      />
      <RadioButton
        id="irregular"
        value="Irregular"
        checked={selectedVerbType === 'Irregular'}
        onChange={onChange}
        label="Irregular"
      />
    </div>
  );
};

export default VerbTypeSwitch;
