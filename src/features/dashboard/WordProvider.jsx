import { createContext, useContext, useEffect, useState } from 'react';
import defaultData from '../../infrastructure/utils/data/data';

export const WordContext = createContext();

export const useWords = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error('useWords must be used within a WordProvider');
  }
  return context;
};

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState(() => {
    const storedWords = JSON.parse(localStorage.getItem('words'));
    return storedWords || defaultData;
  });

  useEffect(() => {
    if (!localStorage.getItem('words')) {
      localStorage.setItem('words', JSON.stringify(defaultData));
    }
  }, []);

  const addWord = newWord => {
    const newId = words.reduce((maxId, word) => Math.max(maxId, word.id), 0) + 1;

    const newWordWithId = {
      id: newId,
      ...newWord,
      progress: 0,
      editDelete: 'Edit/Delete',
    };

    const updatedWords = [...words, newWordWithId];
    setWords(updatedWords);
    localStorage.setItem('words', JSON.stringify(updatedWords));
  };

  const editWord = updatedWord => {
    const updatedWords = words.map(word => (word.id === updatedWord.id ? updatedWord : word));
    setWords(updatedWords);
    localStorage.setItem('words', JSON.stringify(updatedWords));
  };

  const removeWord = wordId => {
    const updatedWords = words.filter(word => word.id !== wordId);
    setWords(updatedWords);
    localStorage.setItem('words', JSON.stringify(updatedWords));
  };

  return (
    <WordContext.Provider value={{ words, addWord, editWord, removeWord }}>
      {children}
    </WordContext.Provider>
  );
};
