import styles from './index.module.scss';

const CategoriesSelector = ({ categories, onChange }) => {
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <select onChange={onChange} className={styles.select}>
      <option value="">Select category</option>
      {categoryList.map(category => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
export default CategoriesSelector;
