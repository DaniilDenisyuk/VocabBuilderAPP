import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories as loadCategories } from '../redux/categoriesSlice';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(state => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVerbType, setSelectedVerbType] = useState('Regular');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadCategories());
    }
  }, [status, dispatch]);

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handleVerbTypeChange = e => {
    setSelectedVerbType(e.target.value);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        status,
        error,
        selectedCategory,
        selectedVerbType,
        handleVerbTypeChange,
        handleCategoryChange,
      }}
    >
      {status === 'loading' ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
      ) : (
        children
      )}
    </CategoryContext.Provider>
  );
};

// import { createContext, useContext, useState } from 'react';

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedVerbType, setSelectedVerbType] = useState('Regular');

//   const handleCategoryChange = e => {
//     setSelectedCategory(e.target.value);
//   };

//   const handleVerbTypeChange = e => {
//     setSelectedVerbType(e.target.value);
//   };

//   return (
//     <CategoryContext.Provider
//       value={{
//         selectedCategory,
//         selectedVerbType,
//         handleVerbTypeChange,
//         handleCategoryChange,
//       }}
//     >
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export const useCategory = () => {
//   const context = useContext(CategoryContext);
//   if (context === undefined) {
//     throw new Error('useCategory must be used within a CategoryProvider');
//   }
//   return context;
// };
