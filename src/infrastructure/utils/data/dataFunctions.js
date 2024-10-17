import defaultData from './data';

export const getCategories = () => {
  const categories = new Set(defaultData.map(item => item.category));
  return Array.from(categories).map((category, index) => ({
    id: index,
    name: category,
  }));
};

export const addWord = newWord => {
  const storedWords = JSON.parse(localStorage.getItem('words')) || defaultData;
  const newId = storedWords.reduce((maxId, word) => Math.max(maxId, word.id), 0) + 1;

  const newWordWithId = {
    id: newId,
    ...newWord,
    progress: 0,
    editDelete: 'Edit/Delete',
  };

  const updatedWords = [...storedWords, newWordWithId];
  localStorage.setItem('words', JSON.stringify(updatedWords));
};

export const editWord = updatedWord => {
  const storedWords = JSON.parse(localStorage.getItem('words')) || defaultData;
  const index = storedWords.findIndex(word => word.id === updatedWord.id);

  if (index !== -1) {
    storedWords[index] = {
      ...storedWords[index],
      ...updatedWord,
    };
    localStorage.setItem('words', JSON.stringify(storedWords));
  }
};

export const removeWord = wordId => {
  const storedWords = JSON.parse(localStorage.getItem('words')) || defaultData;
  const updatedWords = storedWords.filter(word => word.id !== wordId);
  localStorage.setItem('words', JSON.stringify(updatedWords));
};

export const fetchCategories = () => {
  return new Promise(resolve => {
    const categories = getCategories();
    resolve(categories);
  });
};
