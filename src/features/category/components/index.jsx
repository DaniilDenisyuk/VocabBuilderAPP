import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useGetWordsCategoriesQuery } from '../../../infrastructure/api/redux/apiSlice';

const CategoryAndVerbTypeSelector = ({
  selectedCategory,
  isIrregular,
  onCategoryChange,
  onVerbTypeChange,
  variant = 'dashboard',
  className = '',
}) => {
  const { data, error, isLoading } = useGetWordsCategoriesQuery();
  const categories = data || [];

  const [isIrregularState, setIsIrregularState] = useState(isIrregular);

  useEffect(() => {
    setIsIrregularState(isIrregular);
  }, [isIrregular]);

  const handleRadioChange = value => {
    setIsIrregularState(value);
    onVerbTypeChange(value);
  };

  const RadioButton = ({ id, value, checked, label }) => {
    return (
      <div
        className={classNames(styles.radioBtnContainer, styles[`radioBtnContainer--${variant}`])}
      >
        <input
          id={id}
          type="radio"
          value={value}
          checked={checked}
          onChange={() => handleRadioChange(value)}
          className={styles.radioBtnInput}
        />
        <label
          htmlFor={id}
          className={classNames(styles.radioBtnLabel, { [styles.checked]: checked })}
        />
        <span className={classNames(styles.radioBtnText, styles[`radioBtnText--${variant}`])}>
          {label}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }
  if (error) {
    return <p>Error loading categories</p>;
  }

  return (
    <div className={classNames(styles.categoriesSelectorContainer, className)}>
      <select
        value={selectedCategory}
        onChange={e => {
          onCategoryChange(e.target.value);
          if (e.target.value !== 'verb') {
            setIsIrregularState(false);
            onVerbTypeChange(false);
          }
        }}
        className={styles.select}
      >
        <option value="">Select category</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory === 'verb' && (
        <div className={classNames(styles.radioBtnGroup, className)}>
          <RadioButton
            id="regular"
            value={false}
            checked={isIrregularState === false}
            label="Regular"
          />
          <RadioButton
            id="irregular"
            value={true}
            checked={isIrregularState === true}
            label="Irregular"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryAndVerbTypeSelector;
