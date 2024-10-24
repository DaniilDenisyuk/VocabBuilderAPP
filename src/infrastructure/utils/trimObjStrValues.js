// Функція trimObjStrValues має:
//1. Приймати об'єкт.
//2. Опційно приймати масив ключів, які потрібно перевірити.
//3. Якщо масив ключів не передано, перебрати всі ключі об'єкта.
//4. Повернути новий об'єкт з тими ж ключами, де значення є рядковими, але обрізаними (trimmed).

export const trimObjStrValues = (obj, keys) => {
  try {
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('The first argument must be an object');
    }
    if (keys && !Array.isArray(keys)) {
      throw new Error('The second argument must be an array of keys or undefined');
    }
    const keysArray = keys || Object.keys(obj);
    //keysArray.reduce(...) створює новий об'єкт
    //trimmedObj, перебираючи кожен ключ у keysArray.
    return keysArray.reduce((trimmedObj, key) => {
      if (key in obj) {
        trimmedObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
      }

      return trimmedObj;
    }, {});
  } catch (error) {
    console.error(error.message);
    return {};
  }
};

const str1 = { arr: [1, 2, 3], age: 35, name: '   Serg  ', city: '  Lviv' };
const str2 = { name: '   Ann  ', age: 45, job: 'Developer   ' };

console.log('trimmedStr1:', trimObjStrValues(str1));
console.log('trimmedStr2:', trimObjStrValues(str2, ['name']));
console.log('trimmedStr2:', trimObjStrValues(str2, ['age', 'job']));

console.log('Invalid obj:', trimObjStrValues(null));
console.log('Invalid keys:', trimObjStrValues(str1, 'name'));
