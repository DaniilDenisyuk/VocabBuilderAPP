//trimObjStrValues.jsx
export const trimObjStrValues = (obj, keys) => {
  const keysArray = keys || Object.keys(obj);

  //! 1v
  return keysArray.reduce((trimmedObj, key) => {
    if (key in obj) {
      trimmedObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
    }

    return trimmedObj;
  }, {});

  //! 2v
  // const trimmedObj = {};
  // keysArray.forEach(key => {
  //   if (key in obj) {
  //     trimmedObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
  //   }
  // });
  // return trimmedObj;
};

export default function TestTrim() {
  const str1 = { arr: [1, 2, 3], age: 35, name: '   Serg  ', city: '  Lviv' };
  const str2 = { name: '   Ann  ', age: 45, job: 'Developer   ' };

  console.log('trimmedStr1: ', trimObjStrValues(str1));
  console.log('trimmedStr2: ', trimObjStrValues(str2, ['name']));
  console.log('trimmedStr2: ', trimObjStrValues(str2, ['age', 'job']));
}
TestTrim();
