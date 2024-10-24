import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { fetchCategories } from '../redux/categoriesSlice';
import { useEffect } from 'react';

const CategoriesSelector = ({ onChange }) => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector(state => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <select onChange={onChange} className={styles.select}>
      <option value="">Select category</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};
export default CategoriesSelector;
