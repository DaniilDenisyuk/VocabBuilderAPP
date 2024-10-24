import data from '../../../data.json';

const localAPI = {
  getWords: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  },
  getCategories: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const setCategories = new Set(data.map(word => word.category));
        resolve(Array.from(setCategories));
      }, 1000);
    });
  },
};

export default localAPI;
