import classNames from 'classnames';
import styles from './index.module.scss';
import { useGetWordsCategoriesQuery } from '../../../infrastructure/api/redux/apiSlice';

const CategoriesSelector = ({
  selectedCategory,
  selectedVerbType,
  onCategoryChange,
  onVerbTypeChange,
  variant = 'modal',
}) => {
  const { data, error, isLoading } = useGetWordsCategoriesQuery();
  const categories = data || [];

  const RadioButton = ({ id, value, checked, label }) => (
    <div className={classNames(styles.radioBtnContainer, styles[`radioBtnContainer--${variant}`])}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onVerbTypeChange(value)}
        className={styles.radioBtnInput}
      />
      <label
        htmlFor={id}
        className={classNames(styles.radioBtnLabel, { [styles.checked]: checked })}
      >
        <span className={classNames(styles.radioBtnText, styles[`radioBtnText--${variant}`])}>
          {label}
        </span>
      </label>
    </div>
  );

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;
  return (
    <div className={styles.categoriesSelectorContainer}>
      <select
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
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
        <div className={styles.radioBtnGroup}>
          <RadioButton
            id="regular"
            value="Regular"
            checked={selectedVerbType === 'Regular'}
            label="Regular"
          />
          <RadioButton
            id="irregular"
            value="Irregular"
            checked={selectedVerbType === 'Irregular'}
            label="Irregular"
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesSelector;
