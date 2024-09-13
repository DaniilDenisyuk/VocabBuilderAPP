import {
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getCategories } from '../../../infrastructure/utils/data';
// import fetchCategories from './categoriesOperations'; //отримання кат з бекенду

//отримання категорій з локального файлу
const fetchCategories = async (setLoading, setError) => {
  setLoading(true);
  setError(null);
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getCategories();
  } catch (error) {
    setError('Failed to fetch categories');
    return [];
  } finally {
    setLoading(false);
  }
};

export default function CategoriesPopup({ isOpen, onClose, onSelectCategory }) {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
    middleware: [offset(8), flip(), shift()],
  });
  const [categories, setCategories] = useState([]);
  const [selectedVerbType, setSelectedVerbType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const loadCategiries = async () => {
        try {
          const data = await fetchCategories(setLoading, setError);
          setCategories(data);
        } catch (error) {
          console.error(error);
        }
      };
      loadCategiries();
    }
  }, [isOpen]);

  const handleRadioChange = e => {
    setSelectedVerbType(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles.popup}
          aria-placeholder="Categories"
          onScroll={scroll}
        >
          {loading && <p>Loading categories...</p>}
          {error && <p>{error}</p>}
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => onSelectCategory(category)}>
                {category}
                {category === 'Verb' && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Regular"
                        checked={selectedVerbType === 'Regular'}
                        name="verbType"
                        onChange={handleRadioChange}
                      />
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Irregular"
                        checked={selectedVerbType === 'Irregular'}
                        name="verbType"
                        onChange={handleRadioChange}
                      />
                    </label>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}
